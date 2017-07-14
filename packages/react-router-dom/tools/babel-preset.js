const buildPreset = require('babel-preset-es2015').buildPreset

const building = process.env.BABEL_ENV != undefined

const plugins = []

if (building) {
  plugins.push('external-helpers')
}

module.exports = {
  presets: [
    [ buildPreset, {
      loose: true,
      modules: building ? false : 'commonjs'
    } ]
  ],
  plugins: plugins
}
