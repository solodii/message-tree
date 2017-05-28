import * as React from 'react';
import { shallow } from 'enzyme';
import AppComponent, { Props } from '../AppComponent';

describe('AppComponent', () => {
  const initApp = jest.fn();
  const initialProps: Props = { initApp };
  const wrapper = shallow<Props, {}>(
    <AppComponent {...initialProps} />
  );

  test('MessageTreeContainer is rendered', () => {
    expect(wrapper.find('MessageTreeContainer').length).toEqual(1);
  });

  test('initApp is called after componentDidMount', () => {
    (wrapper.instance() as AppComponent).componentDidMount();
    expect(initApp).toHaveBeenCalledTimes(1);
  });
});
