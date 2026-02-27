import { SignedValuePipe } from './signed-value.pipe';

describe('SignedValuePipe', () => {
  it('create an instance', () => {
    const pipe = new SignedValuePipe();
    expect(pipe).toBeTruthy();
  });
});
