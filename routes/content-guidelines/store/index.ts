/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { reducer } from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';

export const STORE_NAME = 'wordpress/content-guidelines';

export const store = createReduxStore( STORE_NAME, {
	reducer,
	actions,
	selectors,
} );

register( store );
