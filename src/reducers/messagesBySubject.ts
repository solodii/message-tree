import {
  APPEND_MESSAGE,
  LOAD_MESSAGES,
  MessagesAction,
  AppendMessage,
  LoadMessages
} from '../actions/messages';

export interface Message {
  id: string;
  subjectId: string;
  date: Date;
  text: string;
}

interface WritableState {
  [subjectId: string]: Message[];
}

export type State = Readonly<WritableState>;

export const emptySubject = '';

export function loadMessagesCase(state: State, action: LoadMessages): State {
  const result: WritableState = {};
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

export function getSubjectIds(state: State): string[] {
  return Object.keys(state);
}

export function hasMessages(
  state: State,
  subjectId: string = emptySubject
): boolean {
  return state.hasOwnProperty(subjectId);
}

export function getMessages(
  state: State,
  subjectId: string = emptySubject
): Message[] {
  return state[subjectId];
}
