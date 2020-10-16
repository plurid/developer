// #region exports
export interface Configuration {
    server: string;
    identonym: string;
    key: string;
    token: string;
    isDefault: boolean;
    projects: Project[];
}


export interface Project {
    name: string;
    space: string;
    path: string;
}
// #endregion exports
