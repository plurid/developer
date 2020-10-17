```
local machine
    - code (file system)
    - editor (has access to the code)
    - developer-cli
```

```
$pwd: /my-project

> developer build

    looks up for the space configuration file

    finds space configuration file in /my-project/configuratins/developer.deon

    makes an archive out of the source code
        - base package -> incrementally update it

    upload the archive to the developer server together with the configuration

    once it reaches the developer server, it unpacks it and starts parsing the configuration file

    let's say, the server handles the `build` phase which has an output out `build/index.js`

    the server packages the outputted files into an archive
    and sends them to the developer client CLI server/tool (the local machine)

    once the developer client CLI server/tool receives the build archive,
    it unpacks it in the space package directory, based on the output configuration
```




```
developer.plurid.cloud

developer.plurid.cloud/download/<sha256>

developer cli to pass a secret to the download url


at start, the developer cli server gets a tunnel to
developer.plurid.cloud/tunnels/<sha256>

when the developer server finishes the build, it sends a message (post request) to
developer.plurid.cloud/tunnels/<sha256>
which is actually listened through the tunnel by the developer cli client

which receives a message with the download link

{
    download https://developer.plurid.cloud/download/<sha256>
    configuration /my-project/build
}

the cli downloads the data from the link using the secret
and unpacks the downloaded data into the correct configuration location
```
