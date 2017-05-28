import * as React from 'react';
import { shallow } from 'enzyme';
import * as dateformat from 'dateformat';
import MessageComponent, { Props } from '../MessageComponent';

describe('MessageComponent', () => {
  const text = Math.random().toString();
  const date = new Date();
  const initialProps: Props = {
    message: {
      id: '',
      subjectId: '',
      text,
      date
    }
  };
  const wrapper = shallow<Props, {}>(
    <MessageComponent {...initialProps} />
  );

  test('is .message', () => {
    expect(wrapper.is('.message')).toBeTruthy();
  });

  test('renders text', () => {
    expect(wrapper.contains(<span>{text}</span>)).toBeTruthy();
  });

  test('renders formated date', () => {
    expect(wrapper.contains(<span>{dateformat(date)}</span>)).toBeTruthy();
  });
});
