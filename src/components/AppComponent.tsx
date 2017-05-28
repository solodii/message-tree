import * as React from 'react';
import MessageTreeContainer from '../containers/MessageTreeContainer';

export interface Props {
  initApp: () => void;
}

export default class AppComponent
  extends React.Component<Props, {}>
  implements React.ComponentLifecycle<Props, {}> {

  public componentDidMount(): void {
    this.props.initApp();
  }

  public render(): JSX.Element {
    return <MessageTreeContainer />;
  }
}
