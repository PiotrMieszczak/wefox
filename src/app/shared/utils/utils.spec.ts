import { assertProperties } from './utils';

describe('Utils', () => {
  it('should assert properties', () => {
    const objectMock = { user: 1, title: '', content: '' };
    const condition = assertProperties(['title', 'content'], objectMock);

    expect(condition).toBeTruthy();
  });
});
