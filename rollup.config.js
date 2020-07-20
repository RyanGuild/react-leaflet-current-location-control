// rollup.config.js
const typescript = require('@rollup/plugin-typescript')

module.exports = {
  input: './src/index.tsx',
  output: [
    { file: 'dist/index.js', format: 'cjs' },
    { file: 'dist/index.esm.js', format: 'esm' }
  ],
  plugins: [
    typescript({
      include: ['src/**/*'],
      exclude: ['node_modules/**/*']
    })
  ]
}
