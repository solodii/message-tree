import {
  State,
  Draft,
  DraftsBySubject
} from '../types';

function getDraftsBySubject(state: State): DraftsBySubject {
  return state.draftsBySubject;
}

export function getDraftsSubjects(state: State): string[] {
  const bySubject = getDraftsBySubject(state);
  return Object.keys(bySubject);
}

export function hasDraft(state: State, subjectId: string): boolean {
  return getDraftsBySubject(state).hasOwnProperty(subjectId);
}

export function getDraft(state: State, subjectId: string): Draft {
  const bySubject = getDraftsBySubject(state);
  return bySubject[subjectId];
}

export function isDraftValid(state: State, subjectId: string): boolean {
  return hasDraft(state, subjectId) && !!getDraft(state, subjectId).text;
}
