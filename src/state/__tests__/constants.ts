import * as constants from '../constants';

test('constants are correct', () => {
  expect(constants).toMatchSnapshot();
});
