import {
  changeDraft,
  cleanDraft,
  createDraft
} from '../../../actions/drafts';
import {
  validDraft,
  NONEXISTENT_SUBJECT,
  draftsBySubject as state
} from '../../../mocks/data';
import { DraftsBySubject as State } from '../../types';
import { ROOT_SUBJECT } from '../../constants';
import reducer, * as fromDraftsBySubject from '../draftsBySubject';

test('defaultState is empty draft', () => {
  expectDraftIsEmpty(fromDraftsBySubject.defaultState, ROOT_SUBJECT);
});

describe('draftsBySubject reducer', () => {
  describe('default case', () => {
    const action = { type: 'DEFAULT' };

    test('returns defaultState if previous state is undefined', () => {
      const current = (reducer as any)(undefined, action);
      expect(current).toEqual(fromDraftsBySubject.defaultState);
    });

    test('returns previous state', () => {
      const previous = state;
      const current = (reducer as any)(previous, action);
      expect(current).toEqual(previous);
    });
  });

  describe('CREATE_DRAFT case', () => {
    const subjectId = NONEXISTENT_SUBJECT;
    const previous: State = state;
    const current: State = reducer(previous, createDraft(subjectId));

    test('state is immutable', () => {
      expect(current).not.toBe(previous);
    });

    test('other drafts are preserved', () => {
      expectOtherDraftsArePreserved(previous, current, subjectId);
    });

    test('creates empty draft', () => {
      expectDraftIsEmpty(current, subjectId);
    });
  });

  describe('CHANGE_DRAFT case', () => {
    const { subjectId } = validDraft;
    const newText = Math.random().toString();
    const previous: State = state;
    const current: State = reducer(previous, changeDraft(newText, subjectId));

    test('state is immutable', () => {
      expect(current).not.toBe(previous);
      expect(current[subjectId]).not.toBe(previous[subjectId]);
    });

    test('other drafts are preserved', () => {
      expectOtherDraftsArePreserved(previous, current, subjectId);
    });

    test('changes text of draft', () => {
      expect(current[subjectId].text).toEqual(newText);
    });
  });

  describe('CLEAN_DRAFT case', () => {
    describe('not ROOT_SUBJECT', () => {
      const { subjectId } = validDraft;
      const previous: State = state;
      const current: State = reducer(previous, cleanDraft(subjectId));

      test('state is immutable', () => {
        expect(current).not.toBe(previous);
      });

      test('other drafts are preserved', () => {
        expectOtherDraftsArePreserved(previous, current, subjectId);
      });

      test('removes draft', () => {
        expect(current.hasOwnProperty(subjectId)).toEqual(false);
      });
    });

    describe('ROOT_SUBJECT', () => {
      const subjectId = ROOT_SUBJECT;
      const previous: State = state;
      const current: State = reducer(previous, cleanDraft(subjectId));

      test('state is immutable', () => {
        expect(current).not.toBe(previous);
      });

      test('other drafts are preserved', () => {
        expectOtherDraftsArePreserved(previous, current, subjectId);
      });

      test('cleanes draft', () => {
        expectDraftIsEmpty(current, subjectId);
      });
    });
  });
});

function expectOtherDraftsArePreserved(
  previous: State,
  current: State,
  subjectId: string
) {
  Object.keys(previous)
    .filter((key) => key !== subjectId)
    .forEach((key) => expect(previous[key]).toEqual(current[key]));
}

function expectDraftIsEmpty(state: State, subjectId: string) {
  const draft = state[subjectId];
  expect(draft).toBeDefined();
  expect(draft.subjectId).toEqual(subjectId);
  expect(draft.text).toEqual('');
}
