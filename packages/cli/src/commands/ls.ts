import { $ } from 'execa'
import { Winget } from '../types'
import { argParse } from '../utils'

export const ls = (args?: Winget.ListArgs, options?: Winget.ListOptions) => {
  let command = `winget list ${args ? argParse(args) : ''} ${options?.join(' ')||''}`
  return $`${command}`
}