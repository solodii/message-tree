export const CREATE_DRAFT = 'CREATE_DRAFT';
export const CHANGE_DRAFT = 'CHANGE_DRAFT';
export const SUBMIT_DRAFT = 'SUBMIT_DRAFT';
export const CLEAN_DRAFT = 'CLEAN_DRAFT';

export interface CreateDraft {
  type: typeof CREATE_DRAFT;
  subjectId: string;
}

export interface ChangeDraft {
  type: typeof CHANGE_DRAFT;
  subjectId: string;
  text: string;
}

export interface SubmitDraft {
  type: typeof SUBMIT_DRAFT;
  subjectId: string;
}

export interface CleanDraft {
  type: typeof CLEAN_DRAFT;
  subjectId: string;
}

export type DraftsAction = CreateDraft | ChangeDraft | SubmitDraft | CleanDraft;

export function createDraft(subjectId: string): CreateDraft {
  return {
    type: CREATE_DRAFT,
    subjectId
  };
}

export function changeDraft(text: string, subjectId: string): ChangeDraft {
  return {
    type: CHANGE_DRAFT,
    text,
    subjectId
  };
}

export function submitDraft(subjectId: string): SubmitDraft {
  return {
    type: SUBMIT_DRAFT,
    subjectId
  };
}

export function cleanDraft(subjectId: string): CleanDraft {
  return {
    type: CLEAN_DRAFT,
    subjectId
  };
}
