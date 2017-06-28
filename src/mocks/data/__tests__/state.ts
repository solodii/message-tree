import { state } from '../state';

test('state', () => {
  expect(state).toMatchSnapshot();
});
