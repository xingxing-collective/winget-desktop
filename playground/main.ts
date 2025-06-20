import { ls } from '../packages/cli/src/commands'

const result= await ls({ name: '-q', value: 'vscode' })

console.log(result)