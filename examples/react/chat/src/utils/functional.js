export function compose(...args) {
  return args.reduce((accumulator, currentFunction) => (...params) => {
    const result = currentFunction(...params);
    return result.then ? result.then(accumulator) : accumulator(result);
  });
}
