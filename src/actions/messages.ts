import { Message } from '../reducers/messagesBySubject';

export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const APPEND_MESSAGE = 'APPEND_MESSAGE';

export interface AppendMessage {
  type: typeof APPEND_MESSAGE;
  message: Message;
}

export interface LoadMessages {
  type: typeof LOAD_MESSAGES;
  messages: Message[];
}

export type MessagesAction = AppendMessage | LoadMessages;

export function loadMessages(messages: Message[]): LoadMessages {
  return {
    type: LOAD_MESSAGES,
    messages
  };
}

export function appendMessage(message: Message): AppendMessage {
  return {
    type: APPEND_MESSAGE,
    message
  };
}
