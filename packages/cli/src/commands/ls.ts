import { $ } from 'execa'

export const command = () => {
  return $`winget list`
}