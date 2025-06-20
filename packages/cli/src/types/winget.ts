export namespace Winget {
  export type ConfigureArgs = Array<
    '-f' | '--file' | '-?' | '--help' | '--wait' | '--verbose' | '--verbose-logs' | '--disable-interactivity'
  >

  export type ConfigureOptions = 'show' | 'test' | 'validate'

  export interface Configure {
    options: ConfigureOptions
    args: ConfigureArgs
  }

  export type ListArgs = {
    name: '-q' | '--query',
    value: string
  }

  export type ListOptions = Array<
    '--id' | '--name' | '--moniker' | '-s' | '--source'
  >

  export interface List {
    options: ListOptions
    args: ListArgs
  }

}