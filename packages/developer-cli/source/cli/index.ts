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
        .command('register')
        .description('register a project for the developer server')
        .action(async () => {
            await stop();
        });

    program
        .command('deregister')
        .description('deregister a project for the developer server')
        .action(async () => {
            await stop();
        });

    program
        .command('build')
        .description('build a registered project')
        .action(async () => {
            await stop();
        });

    program
        .command('watch')
        .description('watch a registered project for changes')
        .action(async () => {
            await stop();
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
