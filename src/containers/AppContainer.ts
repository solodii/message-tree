import { connect } from 'react-redux';
import {
  bindActionCreators,
  Dispatch
} from 'redux';
import { State } from '../reducers';
import { initApp } from '../actions/app';
import AppComponent from '../components/AppComponent';

export interface DispatchProps {
  initApp: () => void;
}

export function mapDispatchToProps(dispatch: Dispatch<State>): DispatchProps {
  return bindActionCreators({ initApp }, dispatch);
}

const AppContainer = connect(
  null,
  mapDispatchToProps
)(AppComponent);

AppContainer.displayName = 'AppContainer';

export default AppContainer;
