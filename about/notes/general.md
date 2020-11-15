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




---


at the level of the configuration to have `templates` which are all encompassing

and at the level of commands to have `schemas`

which provide general scaffolding


---


there should be no need for a developer configuration to be present, the template typescript will be assumed
