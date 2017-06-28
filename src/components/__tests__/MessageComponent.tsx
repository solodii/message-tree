import * as React from 'react';
import { shallow } from 'enzyme';
import { messages } from '../../mocks/data';
import MessageComponent, { Props } from '../MessageComponent';

describe('MessageComponent', () => {
  const initialProps: Props = {
    message: messages[0]
  };
  const wrapper = shallow<Props, {}>(
    <MessageComponent {...initialProps} />
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
