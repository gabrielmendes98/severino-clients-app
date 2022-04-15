/* eslint-disable no-empty-function */
import { isFunction } from '../general';

it('should return true when call isFunction passing a function', () => {
  expect(isFunction(() => {})).toBe(true);
});

it('should return false when call isFunction not passing a function', () => {
  expect(isFunction(2)).toBe(false);
});
