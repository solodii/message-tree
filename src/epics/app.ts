import 'rxjs/add/operator/mergeMapTo';
import {
  InitApp,
  INIT_APP
} from '../actions/app';
import { AppEpic } from './';

export const socketEpic: AppEpic<InitApp> = (action$, store, { socket }) => {
  return action$
    .ofType(INIT_APP)
    .mergeMapTo(socket);
};

export default socketEpic;
