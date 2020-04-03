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
	{ type, active, installed, added, selector, isRequesting, error }
) => {
	switch ( type ) {
		case TYPES.UPDATE_ACTIVE_PLUGINS:
			state = {
				...state,
				active,
				requesting: {
					...state.requesting,
					getActivePlugins: false,
				},
				errors: {
					...state.errors,
					getActivePlugins: false,
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
				},
				errors: {
					...state.errors,
					getInstalledPlugins: false,
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
	}
	return state;
};

export default plugins;
