import { MomentPipe } from './moment.pipe';

describe('DateCustomPipe', () => {
  it('create an instance', () => {
    const pipe = new MomentPipe();
    expect(pipe).toBeTruthy();
  });
});
