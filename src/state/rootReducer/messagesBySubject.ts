import {
  APPEND_MESSAGE,
  LOAD_MESSAGES,
  MessagesAction,
  AppendMessage,
  LoadMessages
} from '../../actions/messages';
import {
  Message,
  MessagesBySubject
} from '../types';

type State = Readonly<MessagesBySubject>;

export function loadMessagesCase(state: State, action: LoadMessages): State {
  const result: MessagesBySubject = {};
  action.messages.forEach((msg: Message) => {
    const { subjectId } = msg;
    const messages = result[subjectId] || [];
    result[subjectId] = messages.concat(msg);
  });  
  return result;
}

export function appendMessageCase(state: State, action: AppendMessage): State {
  const {
    message,
    message: { subjectId }
  } = action;
  const messages = state[subjectId] || [];
  return {
    ...state,
    [subjectId]: messages.concat(message)
  };
}

export default function(state: State = {}, action: MessagesAction): State {
  switch (action.type) {
    case APPEND_MESSAGE:
      return appendMessageCase(state, action);
    case LOAD_MESSAGES:
      return loadMessagesCase(state, action);
    default:
      return state;
  }
}
