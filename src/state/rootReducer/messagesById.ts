import {
  APPEND_MESSAGE,
  LOAD_MESSAGES,
  MessagesAction,
  AppendMessage,
  LoadMessages
} from '../../actions/messages';
import {
  Message,
  MessagesById
} from '../types';

type State = Readonly<MessagesById>;

export function loadMessagesCase(state: State, action: LoadMessages): State {
  const result: MessagesById = {};

  action.messages.forEach((msg: Message) => {
    result[msg.id] = msg;
  });  
  
  return result;
}

export function appendMessageCase(state: State, action: AppendMessage): State {
  const { message } = action;
  return {
    ...state,
    [message.id]: message
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
