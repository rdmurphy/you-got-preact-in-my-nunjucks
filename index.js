// native
const path = require('path');

// packages
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const { h } = require('preact');
const render = require('preact-render-to-string');

// Import our customized babel-register, which only activates when requiring
// from the `components` directory
require('./babel-register');

// "Maybe resolve with default?" helper
const interopDefault = m => (m && m.default ? m.default : m);

// Set up our nunjucks environment
const env = nunjucks.configure('./templates', {
  autoescape: false,
  trimBlocks: true,
});

function renderPreactComponent(p, context = {}) {
  // We piece together the path based on what's passed in, it's important this
  // path matches what was provided to babel-register. Also - I normally use
  // `path.join` instead because I've already resolved the path, but for this
  // demo I resolve here.
  const componentPath = path.resolve('./components', p);
  // Now we can require the component - because its within the directory we
  // set up babel-register to watch for, the babel plugins kick in and convert
  // what we need to make this work. Because we're still in Node, there's very
  // little we have to transpile, but YMMV
  const component = interopDefault(require(componentPath));

  // Now we use preact-render-to-string to... render the component to a string
  return render(h(component, context));
}

// Add our converter as a global to the nunjucks environment
env.addGlobal('renderPreactComponent', renderPreactComponent);

// Only need to render this one file to complete the example
const output = env.render('index.html');
fs.outputFileSync('build/index.html', output);
