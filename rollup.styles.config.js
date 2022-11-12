import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/main.styles.js',
  output: {
    file: 'docs/assets/bundle.styles.js',
    format: 'iife'
  },
  plugins: [
    postcss({
      extensions: [ '.css' ],
      extract: 'styles.css'
    }),
  ]
};