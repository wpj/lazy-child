import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const input = './compiled/index.js';

const external = id => !id.startsWith('.') && !id.startsWith('/');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external,
    plugins: [
      babel({
        exclude: 'node_modules/**',
        extensions,
        runtimeHelpers: true,
        plugins: ['@babel/transform-runtime'],
      }),
      nodeResolve({
        extensions,
      }),
      commonjs({
        include: /node_modules/,
      }),
    ],
  },

  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    external,
    plugins: [
      babel({
        exclude: 'node_modules/**',
        extensions,
        runtimeHelpers: true,
        plugins: [['@babel/transform-runtime', { useESModules: true }]],
      }),
      nodeResolve({
        extensions,
      }),
      commonjs(),
    ],
  },
];
