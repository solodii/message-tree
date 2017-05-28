import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import {
  combineEpics,
  ActionsObservable
} from 'redux-observable';
import {
  Action,
  MiddlewareAPI
} from 'redux';
import { State } from '../reducers';
import appEpic from './app';
import draftsEpic from './drafts';

export interface Dependencies {
  socket: WebSocketSubject<string | Action>;
}

export type AppEpic<T extends Action = Action, S extends State = State> = (
  action$: ActionsObservable<T>,
  store: MiddlewareAPI<S>,
  dependencies?: Dependencies
) => Observable<Action>;

export default combineEpics(
  appEpic,
  draftsEpic
);
