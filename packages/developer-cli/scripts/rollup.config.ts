// #region imports
    // #region libraries
    import commonjs from '@rollup/plugin-commonjs';
    import typescript from 'rollup-plugin-typescript2';
    import json from '@rollup/plugin-json';
    import { terser } from 'rollup-plugin-terser';
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
        terser({
            mangle: false,
            compress: false,
            format: {
                beautify: true,
                comments: false,
            },
        }),
    ],
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
        '@apollo/client/core',
        '@plurid/deon',
        '@plurid/plurid-functions',
        'adm-zip',
        'child_process',
        'commander',
        'cross-fetch',
        'form-data',
        'fs',
        'open',
        'os',
        'path',
        'url',
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
        '@apollo/client/core',
        '@plurid/deon',
        'adm-zip',
        'body-parser',
        'cross-fetch',
        'events',
        'express',
        'form-data',
        'fs',
        'os',
        'path',
        'url',
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
