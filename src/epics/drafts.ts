import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {
  CleanDraft,
  cleanDraft,
  SubmitDraft,
  SUBMIT_DRAFT
} from '../actions/drafts';
import * as fromReducers from '../reducers';
import { AppEpic } from './';

export const persistEpic: AppEpic<SubmitDraft> =
  (action$, store, { socket }): Observable<CleanDraft> => {
    const {
      isDraftValid,
      getDraft
    } = fromReducers;
    return action$
      .ofType(SUBMIT_DRAFT)
      .filter((action) =>
        isDraftValid(store.getState(), action.subjectId)
      )
      .map((action) => {
        const draft = getDraft(store.getState(), action.subjectId);
        socket.next(JSON.stringify(draft));
        return cleanDraft(action.subjectId);
      });
  };

export default persistEpic;
