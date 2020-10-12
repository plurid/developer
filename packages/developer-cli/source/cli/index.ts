// #region imports
    // #region libraries
    import program, {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        status,
        start,
        stop,
        register,
        deregister,
        build,
        watch,
    } from '../commands';
    // #endregion external
// #endregion imports



// #region module
const main = async (
    program: CommanderStatic,
) => {
    program
        .storeOptionsAsProperties(false)
        .passCommandToAction(false);

    program
        .name('developer')
        .usage('<command>')
        .version('0.0.0', '-v, --version')
        .action(() => {
            program.outputHelp();
        });


    program
        .command('status')
        .description('show the connection status')
        .action(async () => {
            await status();
        });

    program
        .command('start')
        .description('start the developer server')
        .action(async () => {
            await start();
        });

    program
        .command('stop')
        .description('stop the developer server')
        .action(async () => {
            await stop();
        });

    program
        .command('register <path>')
        .description('register a project for the developer server')
        .action(async (path: any) => {
            await register(path);
        });

    program
        .command('deregister <path>')
        .description('deregister a project for the developer server')
        .action(async (path: any) => {
            await deregister(path);
        });

    program
        .command('build <project>')
        .description('build a registered project')
        .action(async (project: any) => {
            await build(project);
        });

    program
        .command('watch <project>')
        .description('watch a registered project for changes')
        .action(async (project: any) => {
            await watch(project);
        });


    program.parseAsync(process.argv);
}


const cli = () => {
    main(program);
}
// #endregion module



// #region exports
export default cli;
// #endregion exports
