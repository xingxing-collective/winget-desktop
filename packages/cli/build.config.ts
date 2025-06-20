import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  rollup: {
    dts: {
      respectExternal: false,
    },
  },
  entries: ['src/index']
})