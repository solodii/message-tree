import * as React from 'react';
import { shallow } from 'enzyme';
import AppComponent, { Props } from '../AppComponent';

describe('AppComponent', () => {
  const initApp = jest.fn();
  const initialProps: Props = { initApp };
  const wrapper = shallow<Props, {}>(
    <AppComponent {...initialProps} />
  );

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('initApp is called after componentDidMount', () => {
    expect(initApp).toHaveBeenCalledTimes(0);
    (wrapper.instance() as AppComponent).componentDidMount();
    expect(initApp).toHaveBeenCalledTimes(1);
  });
});
