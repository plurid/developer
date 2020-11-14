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
        .action(async (
            options,
        ) => {
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
        .action(async (
            options,
        ) => {
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
        .action(async (
            options,
        ) => {
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
        .action(async (
            options,
        ) => {
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
        .action(async (
            options,
        ) => {
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
        .action(async (
            path,
            options,
        ) => {
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
        .action(async (
            path,
            options,
        ) => {
            await deregister(
                path,
                options.server,
                options.identonym,
            );
        });


    program
        .command('lint <space>')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .option(
            '-p, --path <path>',
            `path to directory/file, defaults to './source'`,
        )
        .description('lint a registered space or the current directory space')
        .action(async (
            space,
            options,
        ) => {
            await lint(
                space,
                options.server,
                options.identonym,
                options.path,
            );
        });

    program
        .command('test <space>')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .option(
            '-p, --path <path>',
            `path to test directory/file, defaults to './source'`,
        )
        .description('test a registered space or the current directory space')
        .action(async (
            space,
            options,
        ) => {
            await test(
                space,
                options.server,
                options.identonym,
                options.path,
            );
        });

    program
        .command('preview <space>')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .description('preview web elements and scenarios for a registered space or the current directory space')
        .action(async (
            space,
            options,
        ) => {
            await preview(
                space,
                options.server,
                options.identonym,
            );
        });

    program
        .command('watch <space>')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .description('watch for changes a registered space or the current directory space')
        .action(async (
            space,
            options,
        ) => {
            await watch(
                space,
                options.server,
                options.identonym,
            );
        });

    program
        .command('build <space>')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .description('build a registered space or the current directory space')
        .action(async (
            space: any,
            options: any,
        ) => {
            await build(
                space,
                options.server,
                options.identonym,
            );
        });

    program
        .command('run <command> <space>')
        .option(
            '-s, --server <server>',
            'server address',
        )
        .option(
            '-i, --identonym <identonym>',
            'identonym',
        )
        .description('run a named-command in a registered space or the current directory space')
        .action(async (
            command,
            space,
            options,
        ) => {
            await run(
                command,
                space,
                options.server,
                options.identonym,
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
