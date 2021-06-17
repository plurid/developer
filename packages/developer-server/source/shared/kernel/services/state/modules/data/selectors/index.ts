// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getProjects = (state: AppState) => state.data.projects;
const getNotifiers = (state: AppState) => state.data.notifiers;
const getWorkers = (state: AppState) => state.data.workers;


const selectors = {
    getProjects,
    getNotifiers,
    getWorkers,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
