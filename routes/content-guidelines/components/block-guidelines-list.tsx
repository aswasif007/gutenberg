/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { chevronLeft, blockDefault, pencil, trash } from '@wordpress/icons';
import { useInstanceId } from '@wordpress/compose';
import { useState, useMemo } from '@wordpress/element';
import {
	Button,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	Navigator,
	Icon,
	useNavigator,
	type IconType,
} from '@wordpress/components';
import {
	DataViews,
	filterSortAndPaginate,
	type View,
	type Action,
} from '@wordpress/dataviews';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './block-guidelines-list.scss';
import { useBlockTypes } from '../use-block-types';
import { blockIconMap } from '../utils';
import { STORE_NAME } from '../store';

export interface BlockGuidelineItem {
	id: string;
	blockName: string;
	title: string;
	description: string;
	icon: IconType | undefined;
}

interface BlockGuidelinesProps {
	title: string;
	description: string;
}

function BlockGuidelinesList( { title, description }: BlockGuidelinesProps ) {
	const navigator = useNavigator();
	const { removeBlockGuidelines } = useDispatch( STORE_NAME );
	const baseId = useInstanceId(
		BlockGuidelinesList,
		'content-guidelines__block-guidelines-list'
	);
	const headingId = `${ baseId }-heading`;
	const descriptionId = `${ baseId }-description`;
	const { blockTypes, loading, blockGuidelines } = useBlockTypes();

	const blocksWithGuidelines = blockTypes.filter(
		( option ) => blockGuidelines[ option.value ]
	);

	const data = blocksWithGuidelines.map( ( option ) => ( {
		id: option.value,
		blockName: option.value,
		title: option.label,
		description: option.description,
		icon: blockIconMap[ option.value ] ?? blockDefault,
	} ) );

	const [ view, setView ] = useState< View >( {
		type: 'list',
		search: '',
		page: 1,
		perPage: 10,
		filters: [],
		fields: [],
		titleField: 'title',
		descriptionField: 'description',
		mediaField: 'icon',
		showMedia: true,
		showTitle: true,
		showDescription: true,
	} );

	const fields = useMemo(
		() => [
			{
				id: 'icon',
				label: __( 'Icon' ),
				type: 'media' as const,
				render: ( { item }: { item: BlockGuidelineItem } ) => (
					<Icon icon={ item.icon ?? blockDefault } />
				),
			},
			{
				id: 'title',
				label: __( 'Title' ),
				type: 'text' as const,
				enableGlobalSearch: true,
				getValue: ( { item }: { item: BlockGuidelineItem } ) =>
					item.title,
				render: ( { item }: { item: BlockGuidelineItem } ) =>
					item.title,
			},
			{
				id: 'description',
				label: __( 'Description' ),
				type: 'text' as const,
				enableGlobalSearch: true,
				getValue: ( { item }: { item: BlockGuidelineItem } ) =>
					item.description,
				render: ( { item }: { item: BlockGuidelineItem } ) =>
					item.description,
			},
		],
		[]
	);

	const { data: processedData, paginationInfo } = useMemo(
		() => filterSortAndPaginate( data, view, fields ),
		[ data, view, fields ]
	);

	const handleAddBlockGuidelines = () => {
		navigator.goTo( '/guideline/blocks/edit/new' );
	};

	const actions: Action< BlockGuidelineItem >[] = useMemo(
		() => [
			{
				id: 'edit',
				label: __( 'Edit' ),
				icon: pencil,
				callback: ( items ) => {
					const item = items[ 0 ];
					navigator.goTo(
						`/guideline/blocks/edit/${ encodeURIComponent(
							item.blockName
						) }`
					);
				},
			},
			{
				id: 'disable',
				label: __( 'Disable' ),
				callback: () => {
					// TODO: Implement disable functionality
				},
			},
			{
				id: 'remove',
				label: __( 'Remove' ),
				icon: trash,
				callback: ( items ) => {
					const item = items[ 0 ];
					removeBlockGuidelines( item.blockName );
				},
			},
		],
		[ navigator, removeBlockGuidelines ]
	);

	if ( loading ) {
		return (
			<div
				className="content-guidelines__block-guidelines-list"
				role="status"
				aria-live="polite"
			>
				{ __( 'Loading blocks…' ) }
			</div>
		);
	}

	if ( blocksWithGuidelines.length === 0 ) {
		return (
			<div className="content-guidelines__block-guidelines-list">
				<VStack spacing={ 4 }>
					<h2
						id={ headingId }
						className="content-guidelines__block-guidelines-list-title"
					>
						{ title }
					</h2>
					{ description && (
						<p
							id={ descriptionId }
							className="content-guidelines__block-guidelines-list-description"
						>
							{ description }
						</p>
					) }
					<HStack spacing={ 1 } alignment="left">
						<Button
							className="content-guidelines__block-guidelines-list-add-button"
							variant="primary"
							onClick={ handleAddBlockGuidelines }
						>
							{ __( 'Add block guidelines' ) }
						</Button>
					</HStack>
				</VStack>
			</div>
		);
	}

	return (
		<div className="content-guidelines__block-guidelines-list">
			<VStack spacing={ 4 }>
				<HStack
					spacing={ 1 }
					justify="space-between"
					alignment="center"
				>
					<HStack spacing={ 1 } alignment="left">
						<Navigator.BackButton
							onClick={ () => navigator.goTo( '/' ) }
							icon={ chevronLeft }
							aria-label={ __(
								'Go back to content guidelines list'
							) }
							size="small"
						/>
						<h2
							id={ headingId }
							className="content-guidelines__block-guidelines-list-title"
						>
							{ title }
						</h2>
					</HStack>
					<Button
						className="content-guidelines__block-guidelines-list-add-button"
						variant="primary"
						onClick={ handleAddBlockGuidelines }
					>
						{ __( 'Add block guidelines' ) }
					</Button>
				</HStack>
				{ description && (
					<p
						id={ descriptionId }
						className="content-guidelines__block-guidelines-list-description"
					>
						{ description }
					</p>
				) }
				<DataViews
					paginationInfo={ paginationInfo }
					data={ processedData }
					view={ view }
					fields={ fields }
					actions={ actions }
					onChangeView={ setView }
					defaultLayouts={ {
						list: {},
					} }
				/>
			</VStack>
		</div>
	);
}

export default BlockGuidelinesList;
