import {
  CHANGE_DRAFT,
  CLEAN_DRAFT,
  CREATE_DRAFT,
  DraftsAction,
  ChangeDraft,
  CleanDraft,
  CreateDraft
} from '../../actions/drafts';
import {
  Draft,
  DraftsBySubject
} from '../types';
import { ROOT_SUBJECT } from '../constants';

type State = Readonly<DraftsBySubject>;

const rootDraft: Readonly<Draft> = {
  subjectId: ROOT_SUBJECT,
  text: ''
};

export const defaultState: State = {
  [ROOT_SUBJECT]: { ...rootDraft }
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
  const result: DraftsBySubject = { ...state };

  subjectId !== ROOT_SUBJECT
    ? delete result[subjectId]
    : result[ROOT_SUBJECT] = { ...rootDraft };  
  
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
