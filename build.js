const { rollup } = require('rollup')
const uglify = require('rollup-plugin-uglify')
const filesize = require('rollup-plugin-filesize')
const babel = require('rollup-plugin-babel')
const license = require('rollup-plugin-license')

const targets = {
  umd: 'dist/lazyload.js',
  min: 'dist/lazyload.min.js'
}

const build = target => {
  const inputOptions = {
    input: 'src/lazyload.js',
    plugins: [
      license({
        banner:
          '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= moment().format("YYYY-MM-DD") + "\\n" %>' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= moment().format("YYYY") %> <%= pkg.author %>;' +
          ' Licensed <%= pkg.license %> */\n\n'
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      filesize()
    ]
  }

  target === 'min' && inputOptions.plugins.push(uglify())

  const outputOptions = {
    file: targets[target],
    format: 'umd',
    name: 'lazyload'
  }

  return rollup(inputOptions).then(bundle => {
    bundle.write(outputOptions)
  })
}
;(async () => {
  try {
    await Promise.all([build('umd'), build('min')])
  } catch (err) {
    console.log(err)
  }
})()
