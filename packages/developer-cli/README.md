<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/developer/master/about/identity/developer-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/developer/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    developer CLI
</h1>


<h3 align="center">
    Cloud Service for Centralized Source Processor
</h3>



`developer` is a [service](https://developer.plurid.cloud) or self-hosted Centralized Source Processor.


### Contents

+ [About](#about)
+ [CLI](#cli)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## About

A `Source Processor` handles the totality of transformations that are required in order to have the source code runtime-ready.

Such transformations, in a `NodeJS` for web context, consist of linting, testing, transpilation, tree-shaking and other optimizations, bundling. In a `C++` for embedded use context, it may consist only in a targeted compilation.

The `developer-server` registers configurations which receive messages from the `developer-client`, the `CLI`.

The messages can be simple command calls defined in the configuration, such as `build`, or more complex ones, based on custom scripts.

Given a command processed by the `server`, if there is any output, such as built files, the `server` will speak with the `client` to receive the files on the local machine, and place them accordingly, based on the configuration.



## CLI

```
Usage: developer <command>

Options:
    -v, --version                           output the version number
    -h, --help                              display help for command

Commands:
    status                                  show the developer status
    machine [options]                       set a name for the machine
    login [options]                         log into a developer server
    logout [options]                        log out of a developer server
    start [options]                         start the developer server connection
    stop [options]                          stop the developer server connection
    register [options] [path]               register a space for the developer server, given a path or the current directory
    deregister [options] [path]             deregister a space for the developer server, given a path or the current directory
    describe [options] <entity> <name>      describes an entity ('server', 'connection', 'space') given the name
    open [connection]                       opens the server in browser for a given connection (by name or number);
                                            defaults to the first connection, if any
    lint [options] [space]                  lint a registered space or the current directory space
    test [options] [space]                  test a registered space or the current directory space
    preview [options] [space]               preview elements and scenarios for a registered space or the current directory space
    watch [options] [space]                 watch for changes a registered space or the current directory space
    build [options] [space]                 build a registered space or the current directory space
    run [options] <command> [space]         run a named-command in a registered space or the current directory space
```



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@plurid/developer-cli">
    <img src="https://img.shields.io/npm/v/@plurid/developer-cli.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/developer-cli][developer-cli] • the `Command-Line Interface` client

[developer-cli]: https://github.com/plurid/developer/tree/master/packages/developer-cli


<a target="_blank" href="https://www.npmjs.com/package/@plurid/developer-server">
    <img src="https://img.shields.io/npm/v/@plurid/developer-server.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/developer-server][developer-server] • the server application

[developer-server]: https://github.com/plurid/developer/tree/master/packages/developer-server



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
