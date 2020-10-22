// #region imports
    // #region libraries
    import typescript from 'typescript';
    // #endregion libraries
// #endregion imports



// #region module
const transpileTypescript = async (
    id: string,
    file: string,
) => {
    try {
        await new Promise((resolve, _) => {
            const program = typescript.createProgram(
                [file],
                {
                    outDir: `./data/builds/${id}`,
                },
            );

            program.emit();

            resolve();
        });
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    transpileTypescript,
};
// #endregion exports
