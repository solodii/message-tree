import { connect } from 'react-redux';
import {
  bindActionCreators,
  Dispatch
} from 'redux';
import { createDraft } from '../actions/drafts';
import * as fromReducers from '../reducers';
import { Message } from '../reducers/messagesBySubject';
import MessageTreeComponent from '../components/MessageTreeComponent';

type State = fromReducers.State;

export interface StateProps {
  hasMessages: (subjectId?: string) => boolean;
  getMessages: (subjectId?: string) => Message[];
  hasDraft: (subjectId?: string) => boolean;
}

export interface DispatchProps {
  onReply: (subjectId: string) => void;
}

export function mapStateToProps(state: State): StateProps {
  return {
    hasMessages(subjectId?: string) {
      return fromReducers.hasMessages(state, subjectId);
    },
    getMessages(subjectId?: string) {
      return fromReducers.getMessages(state, subjectId);
    },
    hasDraft(subjectId?: string) {
      return fromReducers.hasDraft(state, subjectId);
    }
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
