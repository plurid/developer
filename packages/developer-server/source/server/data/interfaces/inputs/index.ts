// #region module
export interface InputOf<T> {
    input: T;
}


export interface InputValueString {
    value: string;
}


export interface InputGenerateNotifier {
    name: string;
    notifyOn: string[];
    type: string;
    data: string;
}
// #endregion module
