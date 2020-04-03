/**
 * External Dependencies
 */

import { apiFetch } from '@wordpress/data-controls';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import TYPES from './action-types';
import { WC_ADMIN_NAMESPACE } from '../constants';

export function updateActivePlugins( active, added ) {
	return {
		type: TYPES.UPDATE_ACTIVE_PLUGINS,
		active,
		added,
	};
}

export function updateInstalledPlugins( installed, added ) {
	return {
		type: TYPES.UPDATE_INSTALLED_PLUGINS,
		installed,
		added,
	};
}

export function setIsRequesting( selector, isRequesting ) {
	return {
		type: TYPES.SET_IS_REQUESTING,
		selector,
		isRequesting,
	};
}

export function setError( selector, error ) {
	return {
		type: TYPES.SET_ERROR,
		selector,
		error,
	};
}

export function* installPlugin( plugin ) {
	yield setIsRequesting( 'installPlugin', true );

	try {
		const results = yield apiFetch( {
			path: `${ WC_ADMIN_NAMESPACE }/onboarding/plugins/install`,
			method: 'POST',
			data: { plugin },
		} );

		if ( results && results.status === 'success' ) {
			yield updateInstalledPlugins( null, results.slug );
			return results;
		}

		throw new Error( __( 'Plugin installation error' ) );
	} catch ( error ) {
		yield setError( 'installPlugin', error );
		return error;
	}
}

export function* activatePlugins( plugins ) {
	yield setIsRequesting( 'activatePlugins', true );

	try {
		const results = yield apiFetch( {
			path: `${ WC_ADMIN_NAMESPACE }/onboarding/plugins/activate`,
			method: 'POST',
			data: { plugins: plugins.join( ',' ) },
		} );

		if ( results && results.status === 'success' ) {
			yield updateActivePlugins( results.activatedPlugins );
			return results;
		}

		throw new Error( __( 'Plugin activation error' ) );
	} catch ( error ) {
		yield setError( 'activatePlugins', error );
		return error;
	}
}
