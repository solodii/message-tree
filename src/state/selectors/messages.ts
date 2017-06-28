import {
  State,
  Message,
  MessagesById,
  MessagesBySubject,
  MessageTree
} from '../types';
import { hasDraft } from './drafts';

function getMessagesById(state: State): MessagesById {
  return state.messagesById;
}

function getMessagesBySubject(state: State): MessagesBySubject {
  return state.messagesBySubject;
}

export function getMessage(state: State, id: string): Message {
  const byId = getMessagesById(state);
  return byId[id];
}

export function getMessagesSubjects(state: State): string[] {
  const bySubject = getMessagesBySubject(state);
  return Object.keys(bySubject);
}

export function isSubject(state: State, subjectId: string): boolean {
  return getMessagesBySubject(state).hasOwnProperty(subjectId);
}

export function getSubjectMessages(state: State, subjectId: string): Message[] {
  const bySubject = getMessagesBySubject(state);
  return bySubject[subjectId];
}

export function getMessageTrees(
  state: State,
  subjectId: string
): MessageTree[] {
  const trees: MessageTree[] = [];
  const messages = getSubjectMessages(state, subjectId);
  
  if (messages) {
    messages.forEach((message) =>
      trees.push({
        message,
        hasDraft: hasDraft(state, message.id),
        children: getMessageTrees(state, message.id)
      })
    );
  }
  
  return trees;
}
