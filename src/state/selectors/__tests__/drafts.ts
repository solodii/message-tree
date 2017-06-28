import {
  NONEXISTENT_SUBJECT,
  state,
  draftsBySubject,
  validDraft,
  invalidDraft
} from '../../../mocks/data';
import * as selectors from '../drafts';

describe('drafts selectors', () => {
  test('getDraftsSubjects returns all subject ids', () => {
    const { getDraftsSubjects } = selectors;
    expect(
      getDraftsSubjects(state)
    ).toEqual(
      Object.keys(draftsBySubject)
    );
  });

  test('hasDraft checks draft for existence by subjectId', () => {
    const { hasDraft } = selectors;
    expect(
      hasDraft(state, validDraft.subjectId)
    ).toEqual(true);
    expect(
      hasDraft(state, invalidDraft.subjectId)
    ).toEqual(true);
    expect(
      hasDraft(state, NONEXISTENT_SUBJECT)
    ).toEqual(false);
  });

  test('getDraft returns draft by subjectId', () => {
    const { getDraft } = selectors;
    Object.keys(state)
      .forEach((subjectId) =>
        expect(
          getDraft(state, subjectId)
        ).toEqual(draftsBySubject[subjectId])
      );
    expect(
      getDraft(state, NONEXISTENT_SUBJECT)
    ).toBeUndefined();
  });

  test('isDraftValid checks draft for validity by subjectId', () => {
    const { isDraftValid } = selectors;
    expect(
      isDraftValid(state, validDraft.subjectId)
    ).toEqual(true);
    expect(
      isDraftValid(state, invalidDraft.subjectId)
    ).toEqual(false);
    expect(
      isDraftValid(state, NONEXISTENT_SUBJECT)
    ).toEqual(false);
  });
});
