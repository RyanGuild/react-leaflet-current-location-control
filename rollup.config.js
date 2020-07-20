// rollup.config.js
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.tsx',
  output: [
    { file: 'dist/index.js', format: 'cjs', exports: 'named' },
    { file: 'dist/index.esm.js', format: 'esm', exports: 'named' }
  ],
  plugins: [
    typescript({
      include: ['src/**/*'],
      exclude: ['node_modules/**/*']
    })
  ]
}
