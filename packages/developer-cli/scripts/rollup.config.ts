// #region imports
    // #region libraries
    import commonjs from '@rollup/plugin-commonjs';
    import typescript from 'rollup-plugin-typescript2';
    import json from '@rollup/plugin-json';
    // #endregion libraries


    // #region external
    import pkg from '../package.json';
    // #endregion external
// #endregion imports



// #region module
const common = {
    plugins: [
        json(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        commonjs(),
    ]
};


const cli = {
    input: './source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
    ],
    external: [
        'commander',
        'fs',
        'cross-fetch',
        '@apollo/client/core',
        'os',
        'path',
        '@plurid/deon',
        '@plurid/plurid-functions',
        'adm-zip',
        'form-data',
        'url',
        'child_process',
    ],
    plugins: [
        ...common.plugins,
    ],
};


const server = {
    input: './source/server.ts',
    output: [
        {
            file: 'distribution/server.js',
            format: 'cjs',
        },
    ],
    external: [
        'events',
        'express',
        'path',
        'fs',
        'cross-fetch',
        'body-parser',
        'adm-zip',
        'form-data',
        '@plurid/deon',
        'url',
        'os',
        '@apollo/client/core',
    ],
    plugins: [
        ...common.plugins,
    ],
};
// #endregion module



// #region exports
export default [
    cli,
    server,
];
// #endregion exports
