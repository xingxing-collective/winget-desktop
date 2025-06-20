export function parse(input: string) {
  try {
    const lines = input.split('\r').map(x => x.trim().length > 10 ? x.replaceAll('\n', '') : null).filter(Boolean).map(x => x?.split(','))
    const header = lines[0]?.at(0);
    const contents = lines.flat(1)?.slice(2);
    const apps = contents?.map(x => {
      let app;
      header?.split(/\s{2,}/).filter(Boolean).forEach((h, i) => {
        Object.defineProperty(app, h, {
          value: x?.split(/\s{2,}/).filter(Boolean)?.at(i),
          configurable: true,
          enumerable: true,
          writable: true
        })
      })
      return app
    })
    return apps
  } catch (err) {
    throw err;
  }
}