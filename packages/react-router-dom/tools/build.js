const fs = require('fs')
const execSync = require('child_process').execSync
const inInstall = require('in-publish').inInstall
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

if (inInstall())
  process.exit(0)


// don't bundle dependencies for es/cjs builds
const pkg = require('../package.json')
const deps = Object.keys(pkg.dependencies).map(key => key)
const depsString = deps.join(',')

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })

console.log('Building CommonJS modules ...')

exec(
  `rollup -c -f es -o dist/react-router-dom.es.js -e ${depsString}`,
  { NODE_ENV: 'development', BABEL_ENV: 'es' }
)

console.log('\nBuilding ES modules ...')

exec(
  `rollup -c -f cjs -o dist/react-router-dom.common.js -e ${depsString}`,
  { NODE_ENV: 'development', BABEL_ENV: 'cjs' }
)

console.log('\nBuilding react-router-dom.js ...')

exec(
  `rollup -c -f umd -o dist/react-router-dom.js`,
  { NODE_ENV: 'development', BABEL_ENV: 'umd' }
)

console.log('\nBuilding react-router-dom.min.js ...')

exec(
  `rollup -c -f umd -o dist/react-router-dom.min.js`,
  { NODE_ENV: 'production', BABEL_ENV: 'umd' }
)

const size = gzipSize.sync(
  fs.readFileSync('dist/react-router-dom.min.js')
)

console.log('\ngzipped, the UMD build is %s', prettyBytes(size))

