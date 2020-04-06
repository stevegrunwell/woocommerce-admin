/**
 * External Dependencies
 */

import { concat } from 'lodash';

/**
 * Internal dependencies
 */
import TYPES from './action-types';

const plugins = (
	state = { active: [], installed: [], requesting: {}, errors: {} },
	{ type, active, installed, added, selector, isRequesting, error, jetpackConnection }
) => {
	switch ( type ) {
		case TYPES.UPDATE_ACTIVE_PLUGINS:
			state = {
				...state,
				active,
				requesting: {
					...state.requesting,
					getActivePlugins: false,
					activatePlugins: false,
				},
				errors: {
					...state.errors,
					getActivePlugins: false,
					activatePlugins: false,
				},
			};
			break;
		case TYPES.UPDATE_INSTALLED_PLUGINS:
			state = {
				...state,
				installed: added ? concat( state.installed, added ) : installed,
				requesting: {
					...state.requesting,
					getInstalledPlugins: false,
					installPlugin: false,
				},
				errors: {
					...state.errors,
					getInstalledPlugins: false,
					installPlugin: false,
				},
			};
			break;
		case TYPES.SET_IS_REQUESTING:
			state = {
				...state,
				requesting: {
					...state.requesting,
					[ selector ]: isRequesting,
				},
			};
			break;
		case TYPES.SET_ERROR:
			state = {
				...state,
				requesting: {
					...state.requesting,
					[ selector ]: false,
				},
				errors: {
					...state.errors,
					[ selector ]: error,
				},
			};
			break;
		 case TYPES.UPDATE_JETPACK_CONNECTION:
			 state = {
				 ...state,
				 jetpackConnection,
			 };
	}
	return state;
};

export default plugins;
