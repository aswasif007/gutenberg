/**
 * Internal dependencies
 */
import type { Action } from './types';

export function setBlockGuidelines(
	blockName: string,
	guidelines: string
): Action {
	return {
		type: 'SET_BLOCK_GUIDELINES',
		blockName,
		guidelines,
	};
}

export function removeBlockGuidelines( blockName: string ): Action {
	return {
		type: 'REMOVE_BLOCK_GUIDELINES',
		blockName,
	};
}

export function setGuidelines(
	blockGuidelines: Record< string, string >
): Action {
	return {
		type: 'SET_GUIDELINES',
		blockGuidelines,
	};
}
