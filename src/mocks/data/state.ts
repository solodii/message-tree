import { State } from '../../state/types';
import { draftsBySubject } from './drafts';
import {
  messagesById,
  messagesBySubject
} from './messages';

export const state: State = {
  draftsBySubject,
  messagesById,
  messagesBySubject
};
