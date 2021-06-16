// #region imports
    // #region external
    import * as data from '../modules/data';
    import * as general from '../modules/general';
    import * as themes from '../modules/themes';
    import * as view from '../modules/view';
    // #endregion external
// #endregion imports



// #region module
const actions = {
    data: data.actions,
    general: general.actions,
    themes: themes.actions,
    view: view.actions,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
