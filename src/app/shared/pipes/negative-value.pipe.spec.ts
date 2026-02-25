import { NegativeValuePipe } from './negative-value.pipe';

describe('NegativeValuePipe', () => {
  it('create an instance', () => {
    const pipe = new NegativeValuePipe();
    expect(pipe).toBeTruthy();
  });
});
