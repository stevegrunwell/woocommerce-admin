export const getActivePlugins = ( state ) => {
	return state.active || [];
};

export const getInstalledPlugins = ( state ) => {
	return state.installed || [];
};

export const isPluginsRequesting = ( state, selector ) => {
	return state.requesting[ selector ] || false;
};

export const getPluginsError = ( state, selector ) => {
	return state.errors[ selector ] || false;
};
