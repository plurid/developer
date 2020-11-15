# global view


`joiner` orders updates (or the coder changes some) of the packages and pushes the updated repository to `decode`

`performer` listens for changes on the repository and starts building the packages

`developer` listens for commands from `performer` and handles them

`performer` receives processed source files from `developer` and encloses them with `encloser`

`performer` pushes the enclosed imagenes to `hypod`
