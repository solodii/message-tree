import * as React from 'react';
import { shallow } from 'enzyme';
import {
  messagesWithoutDraft,
  messageTrees
} from '../../mocks/data';
import MessageTreeComponent, { Props } from '../MessageTreeComponent';

describe('MessageTreeComponent without messageTrees', () => {
  const onReply = jest.fn();
  const initialProps: Props = {
    messageTrees: [],
    onReply
  };
  const wrapper = shallow<Props, {}>(
    <MessageTreeComponent {...initialProps} />
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('onReply is not called', () => {
    expect(onReply).toHaveBeenCalledTimes(0);
  });
});

describe('MessageTreeComponent with messageTrees', () => {
  const onReply = jest.fn();
  const initialProps: Props = {
    messageTrees,
    onReply
  };
  const wrapper = shallow<Props, {}>(
    <MessageTreeComponent {...initialProps} />
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('onReply is called for each message without reply draft', () => {
    wrapper.find('.reply')
      .forEach((node) =>
        node.simulate('click', { preventDefault: jest.fn() })
      );
    const { calls } = onReply.mock;
    const accordance = messagesWithoutDraft
      .every((msg) =>
        calls.filter((args) => args[0] === msg.id).length === 1
      );
    expect(accordance).toBeTruthy();
  });
});
