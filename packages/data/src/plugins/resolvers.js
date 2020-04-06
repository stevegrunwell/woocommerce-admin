/**
 * External Dependencies
 */

import { apiFetch, dispatch } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { WC_ADMIN_NAMESPACE, JETPACK_NAMESPACE } from '../constants';
import { STORE_NAME } from './constants';

export function* getActivePlugins() {
	yield dispatch( STORE_NAME, 'setIsRequesting', 'getActivePlugins', true );

	try {
		const url = WC_ADMIN_NAMESPACE + '/onboarding/plugins/active';
		const results = yield apiFetch( {
			path: url,
			method: 'GET',
		} );

		yield dispatch( STORE_NAME, 'updateActivePlugins', results.plugins );
	} catch ( error ) {
		yield dispatch( STORE_NAME, 'setError', 'getActivePlugins', error );
	}
}

export function* getInstalledPlugins() {
	yield dispatch( STORE_NAME, 'setIsRequesting', 'getInstalledPlugins', true );

	try {
		const url = WC_ADMIN_NAMESPACE + '/onboarding/plugins/installed';
		const results = yield apiFetch( {
			path: url,
			method: 'GET',
		} );

		yield dispatch( STORE_NAME, 'updateInstalledPlugins', results );
	} catch ( error ) {
		yield dispatch( STORE_NAME, 'setError', 'getInstalledPlugins', error );
	}
}

export function* isJetpackConnected () {
	yield dispatch( STORE_NAME, 'setIsRequesting', 'isJetpackConnected', true );

	try {
		const url = JETPACK_NAMESPACE + '/connection';
		const results = yield apiFetch( {
			path: url,
			method: 'GET',
		} );

		yield dispatch( STORE_NAME, 'updateIsJetpackConnected', results.isActive );
	} catch ( error ) {
		yield dispatch( STORE_NAME, 'setError', 'isJetpackConnected', error );
	}
}
