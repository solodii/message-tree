import {
  CHANGE_DRAFT,
  CLEAN_DRAFT,
  CREATE_DRAFT,
  DraftsAction,
  ChangeDraft,
  CleanDraft,
  CreateDraft
} from '../actions/drafts';

export interface Draft {
  subjectId: string;
  text: string;
}

interface WritableState {
  [subjectId: string]: Draft;
}

export type State = Readonly<WritableState>;

export const emptySubject = '';

const emptyDraft: Readonly<Draft> = {
  subjectId: emptySubject,
  text: ''
};

export const defaultState: State = {
  [emptySubject]: { ...emptyDraft }
};

export function createCase(state: State, action: CreateDraft): State {
  const { subjectId } = action;
  return {
    ...state,
    [subjectId]: {
      subjectId,
      text: ''
    }
  };
}

export function changeCase(state: State, action: ChangeDraft): State {
  const {
    subjectId,
    text
  } = action;
  return {
    ...state,
    [subjectId]: {
      ...state[subjectId],
      text
    }
  };
}

export function cleanCase(state: State, action: CleanDraft): State {
  const { subjectId } = action;
  const result: WritableState = { ...state };
  subjectId
    ? delete result[subjectId]
    : result[emptySubject] = { ...emptyDraft };  
  return result;
}

export default function(
  state: State = defaultState,
  action: DraftsAction
): State {
  switch (action.type) {
    case CREATE_DRAFT:
      return createCase(state, action);
    case CHANGE_DRAFT:
      return changeCase(state, action);
    case CLEAN_DRAFT:
      return cleanCase(state, action);
    default:
      return state;
  }
}

export function getSubjectIds(state: State): string[] {
  return Object.keys(state);
}

export function getDraft(
  state: State,
  subjectId: string = emptySubject
): Draft {
  return state[subjectId];
}

export function hasDraft(
  state: State,
  subjectId: string = emptySubject
): boolean {
  return state.hasOwnProperty(subjectId);
}

export function isValid(
  state: State,
  subjectId: string = emptySubject
): boolean {
  return hasDraft(state, subjectId) && !!getDraft(state, subjectId).text;
}
