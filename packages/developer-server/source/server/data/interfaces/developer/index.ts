// #region module
export interface DevloperConfiguration {
    project: string;
    space: string;
    root: string;
    commands: Record<string, DeveloperCommand>;
}


export interface DeveloperCommand {
    language?: string;
    context?: string;
    input: DeveloperCommandInputType;
    output: DeveloperCommandOutputType;
}


export type DeveloperCommandInputType =
    | string
    | DeveloperCommandInput
    | DeveloperCommandInput[];

export interface DeveloperCommandInput {
    entrypoint: string;
}


export type DeveloperCommandOutputType =
    | string
    | DeveloperCommandOutput
    | DeveloperCommandOutput[];

export interface DeveloperCommandOutput {
    target: string;
    directory: string;
    name: string;
}
// #endregion module
