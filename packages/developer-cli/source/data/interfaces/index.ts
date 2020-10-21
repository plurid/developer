// #region exports
export interface DeveloperConfiguration {
    machine: string;
    workers: DeveloperWorker[];
    connections: Record<number, DeveloperConnection>;
}


export interface DeveloperWorker {
    server: string;
    api: string;
    identonym: string;
    key: string;
    token: string;
    isDefault: boolean;
    spaces: Space[];
}


export interface Space {
    identifier: string;
    project: string;
    name: string;
    path: string;
}


export interface DeveloperConnection {
    port: number;
    pid: number;
    worker: DeveloperWorker;
}
// #endregion exports
