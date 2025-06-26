import { execa } from 'execa'
import { writeFile } from 'fs/promises'

type CwdArgs = Array<{
  arg: '--id' | '--name' | '--moniker' | '--tag' | '--cmd' | '--command' | '-s' | '--source' | '-n' | '--count' | '-e' | '--exact'
  query: string
}>

export const search = async (app: string, cwdArgs?: CwdArgs) => {
  const args = cwdArgs?.map(x => Object.values(x)).flat() || []
  const { stdout } = execa('winget', ['search','--disable-interactivity', app, ...args])
  await writeFile('./stdout.txt', stdout)
}