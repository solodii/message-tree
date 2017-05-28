import { combineReducers } from 'redux';
import draftsBySubject, * as fromDraftsBySubject from './draftsBySubject';
import messagesBySubject, * as fromMessagesBySubject from './messagesBySubject';

type Draft = fromDraftsBySubject.Draft;
type Message = fromMessagesBySubject.Message;

export interface State {
  readonly draftsBySubject: fromDraftsBySubject.State;
  readonly messagesBySubject: fromMessagesBySubject.State;
}

export default combineReducers<State>({
  draftsBySubject,
  messagesBySubject
});

export function getMessagesSubjectIds(state: State): string[] {
  return fromMessagesBySubject.getSubjectIds(state.messagesBySubject);
}

export function getDraftsSubjectIds(state: State): string[] {
  return fromDraftsBySubject.getSubjectIds(state.draftsBySubject);
}

export function hasMessages(state: State, subjectId?: string): boolean {
  return fromMessagesBySubject.hasMessages(state.messagesBySubject, subjectId);
}

export function getMessages(state: State, subjectId?: string): Message[] {
  return fromMessagesBySubject.getMessages(state.messagesBySubject, subjectId);
}

export function hasDraft(state: State, subjectId?: string): boolean {
  return fromDraftsBySubject.hasDraft(state.draftsBySubject, subjectId);
}

export function getDraft(state: State, subjectId?: string): Draft {
  return fromDraftsBySubject.getDraft(state.draftsBySubject, subjectId);
}

export function isDraftValid(state: State, subjectId?: string): boolean {
  return fromDraftsBySubject.isValid(state.draftsBySubject, subjectId);
}
