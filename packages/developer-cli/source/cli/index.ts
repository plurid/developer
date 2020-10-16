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
        setup,
        setdown,
        login,
        logout,
        register,
        deregister,
        lint,
        test,
        watch,
        build,
        run,
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
        .description('start the developer server connection')
        .action(async () => {
            await start();
        });

    program
        .command('stop')
        .description('stop the developer server connection')
        .action(async () => {
            await stop();
        });

    program
        .command('setup')
        .description('setup a connection to a developer server')
        .action(async () => {
            await setup();
        });

    program
        .command('setdown')
        .description('setdown, remove a connection to a developer server')
        .action(async () => {
            await setdown();
        });

    program
        .command('login')
        .description('log into a developer server')
        .action(async () => {
            await login();
        });

    program
        .command('logout')
        .description('log out of a developer server')
        .action(async () => {
            await logout();
        });


    program
        .command('register [path]')
        .description('register a project for the developer server, on a path or in the current directory')
        .action(async (path: any) => {
            await register(path);
        });

    program
        .command('deregister [path]')
        .description('deregister a project for the developer server, on a path or in the current directory')
        .action(async (path: any) => {
            await deregister(path);
        });


    program
        .command('lint [project]')
        .description('lint a registered project or the current directory project')
        .action(async (project: any) => {
            await lint(project);
        });

    program
        .command('test [project]')
        .description('test a registered project or the current directory project')
        .action(async (project: any) => {
            await test(project);
        });

    program
        .command('watch [project]')
        .description('watch for changes a registered project or the current directory project')
        .action(async (project: any) => {
            await watch(project);
        });

    program
        .command('build [project]')
        .description('build a registered project or the current directory project')
        .action(async (project: any) => {
            await build(project);
        });

    program
        .command('run <command> [project]')
        .description('run a named-command in a registered project or the current directory project')
        .action(async (command, project) => {
            await run(
                command,
                project,
            );
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
