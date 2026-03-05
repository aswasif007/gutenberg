/**
 * WordPress dependencies
 */
import { Button, __experimentalVStack as VStack } from '@wordpress/components';
import { Notice } from '@wordpress/ui';
import {
	DataViews,
	filterSortAndPaginate,
	type View,
} from '@wordpress/dataviews';
import { __, sprintf } from '@wordpress/i18n';
import { useMemo, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Icon, blockDefault } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BlockGuidelineModal from './block-guideline-modal';
import { saveContentGuidelines } from '../api';
import { STORE_NAME } from '../store';
import './block-guidelines.scss';
import { blockIconMap } from '../utils';

interface BlockGuidelineRowData {
	id: string;
	blockName: string;
	label: string;
	guidelines: string;
	icon?: unknown;
}

const initialView: View = {
	type: 'list',
	search: '',
	page: 1,
	perPage: 5,
	filters: [],
	mediaField: 'icon',
	showMedia: true,
	titleField: 'label',
	layout: {
		density: 'compact',
	},
};

const fields = [
	{
		id: 'icon',
		label: __( 'Icon' ),
		type: 'media' as const,
		render: ( { item }: { item: BlockGuidelineRowData } ) => (
			<Icon
				icon={ blockIconMap[ item.blockName ] ?? blockDefault }
				size={ 16 }
			/>
		),
	},
	{
		id: 'label',
		label: __( 'Label' ),
		type: 'text' as const,
		enableGlobalSearch: true,
		getValue: ( { item }: { item: BlockGuidelineRowData } ) => item.label,
		render: ( { item }: { item: BlockGuidelineRowData } ) => item.label,
	},
];

export default function BlockGuidelines() {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ view, setView ] = useState< View >( initialView );
	const [ selectedItem, setSelectedItem ] =
		useState< BlockGuidelineRowData | null >( null );
	const [ error, setError ] = useState< string | null >( null );

	const { blockGuidelines, blockTypes } = useSelect(
		( select ) => ( {
			// @ts-ignore
			blockGuidelines: select( STORE_NAME ).getBlockGuidelines(),
			// @ts-ignore
			blockTypes: select( STORE_NAME ).getBlockTypes(),
		} ),
		[]
	);

	const rows = useMemo(
		() =>
			blockTypes
				.filter( ( blockType ) => blockGuidelines[ blockType.value ] )
				.map( ( blockType ) => ( {
					id: blockType.value,
					blockName: blockType.value,
					label: blockType.label,
					guidelines: blockGuidelines[ blockType.value ] ?? '',
				} ) ),
		[ blockGuidelines, blockTypes ]
	);

	const { setBlockGuideline } = useDispatch( STORE_NAME );

	const actions = useMemo(
		() => [
			{
				id: 'edit',
				label: __( 'Edit' ),
				callback: ( items ) => {
					const item = items[ 0 ];
					setSelectedItem( item );
					setIsOpen( true );
				},
			},
			{
				id: 'remove',
				label: __( 'Remove' ),
				callback: ( items ) => {
					const item = items[ 0 ];
					setBlockGuideline( item.blockName, '' );
					saveContentGuidelines()
						.then( () => setError( null ) )
						.catch( ( e: Error ) => setError( e.message ) );
				},
			},
		],
		[ setBlockGuideline ]
	);

	const { data: processedData, paginationInfo } = useMemo(
		() => filterSortAndPaginate( rows, view, fields ),
		[ rows, view ]
	);

	const closeModal = () => {
		setIsOpen( false );
		setSelectedItem( null );
	};

	const openModal = () => {
		setSelectedItem( null );
		setIsOpen( true );
	};

	return (
		<VStack spacing={ 4 } className="block-guidelines">
			{ error && (
				<Notice.Root intent="error">
					<Notice.Title>
						{ sprintf(
							/* translators: %s: Error message. */
							__( 'Error: %s' ),
							error
						) }
					</Notice.Title>
				</Notice.Root>
			) }
			{ rows.length > 0 && (
				<DataViews
					paginationInfo={ paginationInfo }
					data={ processedData }
					view={ view }
					onChangeView={ setView }
					fields={ fields }
					actions={ actions }
					config={ { perPageSizes: [ 5, 10, 20, 50 ] } }
					defaultLayouts={ {
						list: {},
					} }
				></DataViews>
			) }
			<Button
				variant="primary"
				onClick={ openModal }
				className="block-guidelines__add-button"
			>
				{ __( 'Add block guidelines' ) }
			</Button>

			{ isOpen && (
				<BlockGuidelineModal
					closeModal={ closeModal }
					initialBlock={ selectedItem?.blockName ?? null }
				/>
			) }
		</VStack>
	);
}
