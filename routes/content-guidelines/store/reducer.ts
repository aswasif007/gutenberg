/**
 * Internal dependencies
 */
import type { Action, State } from './types';

const initialState: State = {
	blockGuidelines: {},
};

export function reducer( state: State = initialState, action: Action ): State {
	switch ( action.type ) {
		case 'SET_BLOCK_GUIDELINES':
			return {
				...state,
				blockGuidelines: {
					...state.blockGuidelines,
					[ action.blockName ]: action.guidelines,
				},
			};

		case 'REMOVE_BLOCK_GUIDELINES': {
			const { [ action.blockName ]: _, ...rest } = state.blockGuidelines;
			return {
				...state,
				blockGuidelines: rest,
			};
		}

		case 'SET_GUIDELINES':
			return {
				...state,
				blockGuidelines: { ...action.blockGuidelines },
			};
	}

	return state;
}
