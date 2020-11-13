package archiving algorithm


    read all source files

    compute sha1 for each file

    send all the sha1s over network to the developer server

    get response with the sha1s that have changed (if any)

    send all the files linked by the modified sha1s

    receive build data


issues

    handling file moves, renames


to check out diff engines
