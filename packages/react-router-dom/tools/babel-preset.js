const buildPreset = require('babel-preset-es2015').buildPreset

const building = process.env.BABEL_ENV != undefined

const plugins = []

if (building) {
  plugins.push('external-helpers')
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    'dev-expression',
    'transform-react-remove-prop-types'
  )
}

module.exports = {
  presets: [
    [ 'es2015', {
      loose: true,
      modules: building ? false : 'commonjs'
    }],
    "stage-1",
    "react"
  ],
  plugins: plugins
}
