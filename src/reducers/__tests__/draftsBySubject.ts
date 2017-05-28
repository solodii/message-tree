import {
  changeDraft,
  cleanDraft,
  createDraft
} from '../../actions/drafts';
import data, * as fromData from '../../mocks/data/draftsBySubject';
import reducer, * as fromDraftsBySubject from '../draftsBySubject';

type State = fromDraftsBySubject.State;

test('emptySubject is empty string', () => {
  expect(fromDraftsBySubject.emptySubject).toEqual('');
});

test('defaultState is empty draft', () => {
  const {
    defaultState,
    emptySubject
  } = fromDraftsBySubject;
  expectDraftIsEmpty(defaultState, emptySubject);
});

describe('draftsBySubject reducer', () => {
  describe('default case', () => {
    const action = { type: 'DEFAULT' };

    test('returns defaultState if previous state is undefined', () => {
      const current = (reducer as any)(undefined, action);
      expect(current).toEqual(fromDraftsBySubject.defaultState);
    });

    test('returns previous state', () => {
      const current = (reducer as any)(data, action);
      expect(current).toEqual(data);
    });
  });

  describe('CREATE_DRAFT case', () => {
    const subjectId = fromData.nonexistentSubject;
    const previous = data;
    const current = reducer(previous, createDraft(subjectId));

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
    const subjectId = fromData.validSubject;
    const newText = Math.random().toString();
    const previous: State = data;
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
    describe('non empty subject', () => {
      const subjectId = fromData.validSubject;
      const previous: State = data;
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

    describe('empty subject', () => {
      const subjectId = fromDraftsBySubject.emptySubject;
      const previous: State = data;
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

describe('draftsBySubject selectors', () => {
  test('getSubjectIds returns all subject ids', () => {
    expect(
      fromDraftsBySubject.getSubjectIds(data)
    ).toEqual(Object.keys(data));
  });

  test('hasDraft checks draft for existence by subjectId', () => {
    const { hasDraft } = fromDraftsBySubject;

    Object.keys(data)
      .forEach((subjectId) =>
        expect(hasDraft(data, subjectId)).toEqual(true)
      );
    expect(hasDraft(data, fromData.nonexistentSubject)).toEqual(false);
    expect(
      hasDraft(data)
    ).toEqual(
      hasDraft(data, fromDraftsBySubject.emptySubject)
    );
  });

  test('getDraft returns draft by subjectId', () => {
    const { getDraft } = fromDraftsBySubject;

    Object.keys(data)
      .forEach((subjectId) =>
        expect(getDraft(data, subjectId)).toEqual(data[subjectId])
      );
    expect(getDraft(data, fromData.nonexistentSubject)).toBeUndefined();
    expect(
      getDraft(data)
    ).toEqual(
      getDraft(data, fromDraftsBySubject.emptySubject)
    );
  });

  test('isValid checks draft for validity by subjectId', () => {
    const { isValid } = fromDraftsBySubject;

    expect(isValid(data, fromData.nonexistentSubject)).toEqual(false);
    expect(isValid(data, fromData.invalidSubject)).toEqual(false);
    expect(isValid(data, fromData.validSubject)).toEqual(true);
    expect(
      isValid(data)
    ).toEqual(
      isValid(data, fromDraftsBySubject.emptySubject)
    );
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
