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
        describe,
        open,

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
            '-s, --server <value>',
            'server address',
        )
        .requiredOption(
            '-i, --identonym <value>',
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
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
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
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
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
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
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
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
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
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
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
        .command('describe <entity> <name>')
        .option(
            '-s, --server <value>',
            `server address (if describing a 'space')`,
        )
        .option(
            '-i, --identonym <value>',
            `identonym (if describing a 'space')`,
        )
        .description(`describes an entity ('server', 'connection', 'space') given the name`)
        .action(async (
            entity,
            name,
            options,
        ) => {
            await describe(
                entity,
                name,
                options.server,
                options.identonym,
            );
        });

    program
        .command('open [connection]')
        .description(`opens the server in browser for a given connection (by name or number); defaults to the first connection, if any`)
        .action(async (
            value,
        ) => {
            await open(
                value,
            );
        });



    // Space commands.
    program
        .command('lint <space>')
        .option(
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
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
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
            'identonym',
        )
        .option(
            '-p, --path <path>',
            `path to test directory/file, defaults to './source'`,
        )
        .option(
            '-e, --environment <value>',
            'path to environment file (.env-like or .deon file)',
        )
        .description('test a registered space or the current directory space')
        .action(async (
            space,
            options,
        ) => {
            const {
                server,
                identonym,
                path,
                environment,
            } = options;

            await test(
                space,
                server,
                identonym,
                path,
                environment,
            );
        });

    program
        .command('preview <space>')
        .option(
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
            'identonym',
        )
        .option(
            '-e, --environment <value>',
            'path to environment file (.env-like or .deon file)',
        )
        .description('preview web elements and scenarios for a registered space or the current directory space')
        .action(async (
            space,
            options,
        ) => {
            const {
                server,
                identonym,
                environment,
            } = options;

            await preview(
                space,
                server,
                identonym,
                environment,
            );
        });

    program
        .command('watch <space>')
        .option(
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
            'identonym',
        )
        .option(
            '-e, --environment <value>',
            'path to environment file (.env-like or .deon file)',
        )
        .description('watch for changes a registered space or the current directory space')
        .action(async (
            space,
            options,
        ) => {
            const {
                server,
                identonym,
                environment,
            } = options;

            await watch(
                space,
                server,
                identonym,
                environment,
            );
        });

    program
        .command('build <space>')
        .option(
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
            'identonym',
        )
        .option(
            '-p, --production',
            'production flag',
            false,
        )
        .option(
            '-e, --environment <value>',
            'path to environment file (.env-like or .deon file)',
        )
        .description('build a registered space or the current directory space')
        .action(async (
            space: string,
            options,
        ) => {
            const {
                server,
                identonym,
                production,
                environment,
            } = options;

            await build(
                space,
                server,
                identonym,
                production,
                environment,
            );
        });

    program
        .command('run <command> <space>')
        .option(
            '-s, --server <value>',
            'server address',
        )
        .option(
            '-i, --identonym <value>',
            'identonym',
        )
        .option(
            '-e, --environment <value>',
            'path to environment file (.env-like or .deon file)',
        )
        .description('run a named-command in a registered space or the current directory space')
        .action(async (
            command,
            space,
            options,
        ) => {
            const {
                server,
                identonym,
                environment,
            } = options;

            await run(
                command,
                space,
                server,
                identonym,
                environment,
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
