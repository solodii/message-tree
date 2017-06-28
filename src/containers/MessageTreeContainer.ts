import { connect } from 'react-redux';
import {
  bindActionCreators,
  Dispatch
} from 'redux';
import { createDraft } from '../actions/drafts';
import * as selectors from '../state/selectors';
import { State } from '../state/types';
import { ROOT_SUBJECT } from '../state/constants';
import MessageTreeComponent, {
  Props as ComponentProps
} from '../components/MessageTreeComponent';

export interface StateProps {
  messageTrees: ComponentProps['messageTrees'];
}

export interface DispatchProps {
  onReply: ComponentProps['onReply'];
}

export function mapStateToProps(state: State): StateProps {
  return {
    messageTrees: selectors.getMessageTrees(state, ROOT_SUBJECT)
  };
}

export function mapDispatchToProps(dispatch: Dispatch<State>): DispatchProps {
  return bindActionCreators({
    onReply: createDraft
  }, dispatch);
}

const MessageTreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageTreeComponent);

MessageTreeContainer.displayName = 'MessageTreeContainer';

export default MessageTreeContainer;
