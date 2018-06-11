module.exports = {
  plugins: [
    // We have to convert ES6 imports to CJS so it'll play nicely in Node
    '@babel/plugin-transform-modules-commonjs',
    // We're using Preact, so make sure Babel knows
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        useBuiltIns: true,
      },
    ],
    // May not need this if you don't have dynamic imports, but you'll know
    // very quickly if you do
    '@babel/plugin-syntax-dynamic-import',
  ],
};
