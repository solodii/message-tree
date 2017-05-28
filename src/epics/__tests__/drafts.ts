import { ActionsObservable } from 'redux-observable';
import {
  createMiddlewareAPI,
  createDependencies
} from '../../mocks/helpers';
import {
  submitDraft,
  cleanDraft
} from '../../actions/drafts';
import {
  validSubject,
  invalidSubject
} from '../../mocks/data/draftsBySubject';
import { persistEpic } from '../drafts';

describe('persistEpic', () => {
  const store = createMiddlewareAPI();
  const dependencies = createDependencies();
  const nextSpy = jest.spyOn(dependencies.socket, 'next');

  beforeEach(() => {
    nextSpy.mockClear();
  });

  describe('draft is not valid', () => {
    const subjectId = invalidSubject;
    const epic$ = persistEpic(
      ActionsObservable.of(submitDraft(subjectId)),
      store,
      dependencies
    );

    test('is empty', () => {
      epic$.isEmpty().subscribe((isEmpty) => {
        expect(isEmpty).toEqual(true);
      });
      expect(nextSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('draft is valid', () => {
    const subjectId = validSubject;
    const epic$ = persistEpic(
      ActionsObservable.of(submitDraft(subjectId)),
      store,
      dependencies
    );

    test('sends draft on server and produces CleanDraft action', () => {
      epic$.toArray().subscribe((actions) => {
        expect(actions).toEqual([
          cleanDraft(subjectId)
        ]);
      });
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });
});
