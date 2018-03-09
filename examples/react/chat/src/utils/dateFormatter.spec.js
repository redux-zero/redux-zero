import { format } from './dateFormatter';

describe('Test dateFormatter utility script unit', () => {
  it('Check if dateFormatter works correctly', () => {
    const now = new Date();

    expect(format(now.getTime())).toBe(now.toLocaleString());
  });
});
