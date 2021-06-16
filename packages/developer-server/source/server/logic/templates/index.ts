// #region module
const packageJson = (
    id: string,
    dependencies: string,
    command: string,
) => `
{
    "name": "developer-worker-${id}",
    "version": "0.0.0",
    "license": "UNLICENSED",
    "devDependencies": {
        ${dependencies}
    },
    "scripts": {
        "build": "${command}"
    }
}
`;
// #endregion module
