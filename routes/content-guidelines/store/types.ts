/**
 * State for the content guidelines store.
 * Block guidelines are keyed by block name (e.g. "core/paragraph").
 */
export interface State {
	/** Block name -> guidelines text. */
	blockGuidelines: Record< string, string >;
}

/**
 * Action types for the content guidelines store.
 */
export type Action =
	| { type: 'SET_BLOCK_GUIDELINES'; blockName: string; guidelines: string }
	| { type: 'REMOVE_BLOCK_GUIDELINES'; blockName: string }
	| {
			type: 'SET_GUIDELINES';
			blockGuidelines: Record< string, string >;
	  };
