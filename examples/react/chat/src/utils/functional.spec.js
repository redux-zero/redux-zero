import { compose } from './functional';

import { add, multiply } from 'lodash';

describe('Funcional test', () => {
  it('Compose without promises', () => {
    const composedFn = compose(multiply.bind(this, 1), add);
    expect(composedFn(10, 10)).toBe(20);
  });

  it('Compose with promises', () => {
    const asyncMultiply = (val) => Promise.resolve(multiply.call(this, 1, val));
    const composedFn = compose(asyncMultiply, add);

    expect(composedFn(10, 10)).resolves.toBe(20);
  });
});
