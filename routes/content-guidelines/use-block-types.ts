/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './store';

export interface BlockOption {
	value: string;
	label: string;
	description: string;
	icon: string;
}

interface BlockTypeFromAPI {
	name: string;
	title: string;
	parent?: string;
	description: string;
	icon: string;
}

/**
 * Fetches block types from the REST API and returns them as options for selection.
 */
async function fetchBlockTypes(): Promise< BlockOption[] > {
	const response = await apiFetch<
		Record< string, BlockTypeFromAPI > | BlockTypeFromAPI[]
	>( {
		path: '/wp/v2/block-types',
	} );

	const blockTypes = Array.isArray( response )
		? response
		: Object.values( response );

	return blockTypes
		.filter(
			( blockType ) =>
				blockType.title && blockType.name && ! blockType.parent?.length
		)
		.sort( ( a, b ) => a.title.localeCompare( b.title ) )
		.map( ( blockType ) => ( {
			value: blockType.name,
			label: blockType.title,
			description: blockType.description,
			icon: blockType.icon,
		} ) );
}

interface UseBlockTypesResult {
	blockTypes: BlockOption[];
	loading: boolean;
	blockGuidelines: Record< string, string >;
}

export function useBlockTypes(): UseBlockTypesResult {
	const [ blockTypes, setBlockTypes ] = useState< BlockOption[] >( [] );
	const [ loading, setLoading ] = useState( true );
	const blockGuidelines = useSelect(
		( select ) => select( STORE_NAME ).getAllBlockGuidelines(),
		[]
	);

	useEffect( () => {
		setLoading( true );
		fetchBlockTypes().then( ( options ) => {
			setBlockTypes( options );
			setLoading( false );
		} );
	}, [] );

	return { blockTypes, loading, blockGuidelines };
}
