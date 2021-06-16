// #region imports
    // #region external
    import {
        AppState,
    } from '~kernel-services/state/store';
    // #endregion external
// #endregion imports



// #region module
const getLoaded = (state: AppState) => state.general.loaded;
const getNotFoundFace = (state: AppState) => state.general.notFoundFace;



const selectors = {
    getLoaded,
    getNotFoundFace,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
