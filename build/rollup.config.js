import buble from 'rollup-plugin-buble';
import minify from 'rollup-plugin-babel-minify';

export default {
    input: 'src/DATON.js', // Path relative to package.json
    output: {
        name: 'DATON',
        exports: 'default'
    },
    plugins: [
        buble(), // Transpile to ES5
        minify({
            comments: false,
            banner: '/* DATON.js */'
        })
    ],
};