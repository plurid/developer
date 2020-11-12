// #region imports
    // #region libraries
    import program, {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        status,
        machine,
        login,
        logout,
        start,
        stop,
        register,
        deregister,

        lint,
        test,
        preview,
        watch,
        build,
        run,
    } from '#commands/index';
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
        .description('show the developer status')
        .action(async () => {
            await status();
        });


    program
        .command('machine')
        .requiredOption(
            '-n, --name <name>',
            'machine name',
        )
        .description('set a name for the machine')
        .action(async (options: any) => {
            await machine(
                options.name,
            );
        });

    program
        .command('login')
        .requiredOption(
            '-s, --server <server>',
            'server address',
        )
        .requiredOption(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .requiredOption(
            '-k, --key <key>',
            'key',
        )
        .option(
            '-t, --start',
            'start',
            false,
        )
        .description('log into a developer server')
        .action(async (options: any) => {
            await login(
                options.server,
                options.identonym,
                options.key,
                options.start,
            );
        });

    program
        .command('logout')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .option(
            '-o, --obliterate',
            'obliterate the developer server and the registered spaces',
            false,
        )
        .description('log out of a developer server')
        .action(async (options: any) => {
            await logout(
                options.server,
                options.identonym,
                options.obliterate,
            );
        });

    program
        .command('start')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .description('start the developer server connection')
        .action(async (options: any) => {
            await start(
                options.server,
                options.identonym,
            );
        });

    program
        .command('stop')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .option(
            '-p, --port <port>',
            'port',
        )
        .description('stop the developer server connection')
        .action(async (options: any) => {
            await stop(
                options.server,
                options.identonym,
                parseInt(options.port),
            );
        });


    program
        .command('register [path]')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .description('register a space for the developer server, given a path or the current directory')
        .action(async (path: any, options: any) => {
            await register(
                path,
                options.server,
                options.identonym,
            );
        });

    program
        .command('deregister [path]')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .description('deregister a space for the developer server, given a path or the current directory')
        .action(async (path: any, options: any) => {
            await deregister(
                path,
                options.server,
                options.identonym,
            );
        });


    program
        .command('lint [space]')
        .description('lint a registered space or the current directory space')
        .action(async (space: any) => {
            await lint(space);
        });

    program
        .command('test [space]')
        .description('test a registered space or the current directory space')
        .action(async (space: any) => {
            await test(space);
        });

    program
        .command('preview [space]')
        .description('preview web elements and scenarios for a registered space or the current directory space')
        .action(async (space: any) => {
            await preview(space);
        });

    program
        .command('watch [space]')
        .description('watch for changes a registered space or the current directory space')
        .action(async (space: any) => {
            await watch(space);
        });

    program
        .command('build [space]')
        .description('build a registered space or the current directory space')
        .action(async (space: any) => {
            await build(space);
        });

    program
        .command('run <command> [space]')
        .description('run a named-command in a registered space or the current directory space')
        .action(async (command, space) => {
            await run(
                command,
                space,
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
