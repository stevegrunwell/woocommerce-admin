/**
 * Internal dependencies
 */
import reducer from '../reducer';
import TYPES from '../action-types';

const defaultState = { requesting: {}, errors: {} };

describe( 'plugins reducer', () => {
	it( 'should return a default state', () => {
		const state = reducer( undefined, {} );
		expect( state ).toEqual( defaultState );
		expect( state ).not.toBe( defaultState );
	} );

	it( 'should handle UPDATE_ACTIVE_PLUGINS', () => {
		const state = reducer( defaultState, {
			type: TYPES.UPDATE_ACTIVE_PLUGINS,
			activePlugins: [ 'jetpack' ],
		} );

		/* eslint-disable dot-notation */

		expect( state.requesting[ 'getActivePlugins' ] ).toBe( false );
		expect( state.errors[ 'getActivePlugins' ] ).toBe( false );
		/* eslint-enable dot-notation */

		expect( state.activePlugins ).toHaveLength( 1 );
		expect( state.activePlugins[ 0 ] ).toBe( 'jetpack' );
	} );

	it( 'should handle UPDATE_INSTALLED_PLUGINS', () => {
		const state = reducer( defaultState, {
			type: TYPES.UPDATE_INSTALLED_PLUGINS,
			installedPlugins: [ 'jetpack' ],
		} );

		/* eslint-disable dot-notation */

		expect( state.requesting[ 'getInstalledPlugins' ] ).toBe( false );
		expect( state.errors[ 'getInstalledPlugins' ] ).toBe( false );
		/* eslint-enable dot-notation */

		expect( state.installedPlugins ).toHaveLength( 1 );
		expect( state.installedPlugins[ 0 ] ).toBe( 'jetpack' );
	} );

	it( 'should handle SET_IS_REQUESTING', () => {
		const state = reducer( defaultState, {
			type: TYPES.SET_IS_REQUESTING,
			selector: 'getInstalledPlugins',
			isRequesting: true,
		} );

		/* eslint-disable dot-notation */

		expect( state.requesting[ 'getInstalledPlugins' ] ).toBeTruthy();
		/* eslint-enable dot-notation */
	} );

	it( 'should handle SET_ERROR', () => {
		const state = reducer( defaultState, {
			type: TYPES.SET_ERROR,
			selector: 'getInstalledPlugins',
			error: { code: 'error' },
		} );

		/* eslint-disable dot-notation */

		expect( state.errors[ 'getInstalledPlugins' ].code ).toBe( 'error' );
		expect( state.requesting[ 'getInstalledPlugins' ] ).toBe( false );
		/* eslint-enable dot-notation */
	} );
} );
