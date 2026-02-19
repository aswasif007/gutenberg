/**
 * Internal dependencies
 */
import type { State } from './types';

export function getBlockGuidelines(
	state: State,
	blockName: string
): string | undefined {
	return state.blockGuidelines[ blockName ];
}

export function getAllBlockGuidelines(
	state: State
): Record< string, string > {
	return state.blockGuidelines;
}

export function getBlockGuidelineBlockNames( state: State ): string[] {
	return Object.keys( state.blockGuidelines );
}
