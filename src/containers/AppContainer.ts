import { connect } from 'react-redux';
import {
  bindActionCreators,
  Dispatch
} from 'redux';
import { State } from '../state/types';
import { initApp } from '../actions/app';
import AppComponent, {
  Props as ComponentProps
} from '../components/AppComponent';

export interface DispatchProps {
  initApp: ComponentProps['initApp'];
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
