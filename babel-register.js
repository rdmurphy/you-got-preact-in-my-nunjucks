const babelRegister = require('@babel/register');

babelRegister({
  only: ['./components'],
  extensions: ['.js', '.mjs', '.jsx'],
});
