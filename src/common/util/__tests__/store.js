import store from '../store';

store.setLocation('');

it('should start with empty location', () => {
  expect(store.location).toBe('');
});

it('should start with null jwt', () => {
  expect(store.jwt).toBeNull();
});

it('should set location correctly', () => {
  const location = 'location';
  store.setLocation(location);
  expect(store.location).toBe(location);
});

it('should set jwt and modify it to start with "Bearer " when jwt is a valid string', () => {
  const token = 'token';
  store.setJwt(token);
  expect(store.jwt).toBe(`Bearer ${token}`);
});

it('should set jwt as null if pass a invalid string', () => {
  const token = '';
  store.setJwt(token);
  expect(store.jwt).toBeNull();
});
