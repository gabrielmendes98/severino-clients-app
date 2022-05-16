import { throwError } from '../throwError';

jest.mock('../throwError', () => jest.requireActual('../throwError'));

it('should throw error with message', () => {
  const message = 'error message';
  try {
    throwError(message);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe(message);
  }
});
