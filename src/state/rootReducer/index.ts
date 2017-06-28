import { combineReducers } from 'redux';
import { State } from '../types';
import draftsBySubject from './draftsBySubject';
import messagesById from './messagesById';
import messagesBySubject from './messagesBySubject';

export default combineReducers<State>({
  draftsBySubject,
  messagesById,
  messagesBySubject
});
