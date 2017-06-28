import {
  Draft,
  DraftsBySubject
} from '../../state/types';
import { ROOT_SUBJECT } from '../../state/constants';
import { messagesWithDraft } from './messages';

export const drafts: Draft[] = [
  {
    subjectId: ROOT_SUBJECT,
    text: ''
  }
];

messagesWithDraft.forEach((msg) => {
  drafts.push({
    subjectId: msg.id,
    text: `draft for ${msg.id}`
  });
});

export const draftsBySubject: DraftsBySubject = {};

drafts.forEach((draft) => {
  draftsBySubject[draft.subjectId] = draft;
});

export const invalidDraft = drafts[0];
export const validDraft = drafts[1];
