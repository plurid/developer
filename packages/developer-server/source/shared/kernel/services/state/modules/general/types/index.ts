// #region module
export const SET_GENERAL_FIELD = 'SET_GENERAL_FIELD';
export interface SetGeneralFieldPayload<T = any> {
    field: keyof State;
    value: T;
}
export interface SetGeneralFieldAction<T = any> {
    type: typeof SET_GENERAL_FIELD;
    payload: SetGeneralFieldPayload<T>;
}



export interface State {
    loaded: boolean;
    notFoundFace: string;
}


export type Actions =
    | SetGeneralFieldAction;
// #endregion module
