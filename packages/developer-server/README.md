<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/developer/master/about/identity/developer-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/developer/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    developer
</h1>


<h3 align="center">
    Cloud-Native Centralized Source Processor
</h3>



`developer` is a [service](https://developer.plurid.cloud) or self-hosted Centralized Source Processor.

### Contents

+ [About](#about)
+ [Client](#client)
+ [Server](#server)
+ [Packages](#packages)



## About

A `Source Processor` handles the totality of transformations that are required in order to have the source code runtime-ready.

Such transformations, in a `NodeJS` for web context, consist of linting, testing, transpilation, tree-shaking and other optimizations, bundling. In a `C++` for embedded use context, it may consist only in a targeted compilation.

The `developer-server` registers configurations which receive messages from the `developer-client`, the `CLI`.

The messages can be simple command calls defined in the configuration, such as `build`, or more complex ones, based on custom scripts.

Given a command processed by the `server`, if there is any output, such as built files, the `server` will speak with the `client` to receive the files on the local machine, and place them accordingly, based on the configuration.



## Client

`developer` can be used as a Command-Line Interface tool or programatically.

The client connects to a `developer` server to run the commands.



## Server

`developer` can be used as a [service](https://developer.plurid.cloud) or selfhosted.

In order to build a `developer` image run

```
docker build \
    -t developer-server \
    -f ./configurations/production.dockerfile \
    --build-arg PORT=56065 \
    --build-arg DEVELOPER_ENDPOINT_GRAPHQL=/ \
    --build-arg DEVELOPER_DATABASE_TYPE=mongo \
    --build-arg DEVELOPER_LOG_LEVEL=0 \
    --build-arg DEVELOPER_QUIET=false \
    --build-arg DEVELOPER_CUSTOM_LOGIC_USAGE=false \
    --build-arg DEVELOPER_PRIVATE_USAGE=true \
    --build-arg DEVELOPER_PRIVATE_OWNER_IDENTONYM=identonym \
    --build-arg DEVELOPER_PRIVATE_OWNER_KEY=key \
    --build-arg DEVELOPER_PRIVATE_TOKEN=secret-token \
    --build-arg DEVELOPER_MONGO_USERNAME=admin \
    --build-arg DEVELOPER_MONGO_PASSWORD=1234 \
    --build-arg DEVELOPER_MONGO_ADDRESS=localhost:56966 \
    --build-arg DEVELOPER_MONGO_CONNECTION_STRING= \
    --build-arg DEVELOPER_TEST_MODE=true \
    .
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
