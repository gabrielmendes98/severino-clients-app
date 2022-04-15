import { formatPhone, onlyNumbersFormat } from '../formatters';

it('onlyNumbersFormat should receive numbers and characters and return just numbers', () => {
  expect(onlyNumbersFormat('abc 123')).toBe('123');
});

it('formatPhone should receive exact 11 digits and return formatted phone', () => {
  expect(formatPhone('34999999999')).toBe('(34) 9 9999-9999');
});

it('formatPhone should receive less than 11 digits and return it again', () => {
  expect(formatPhone('123')).toBe('123');
});

it('formatPhone should receive more than 11 digits and return it again', () => {
  expect(formatPhone('349999999999')).toBe('349999999999');
});
