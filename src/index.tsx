import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import createStore from './createStore';

ReactDOM.render(
  <Provider store={createStore()}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
