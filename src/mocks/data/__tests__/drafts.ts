import {
  drafts,
  draftsBySubject,
  invalidDraft,
  validDraft
} from '../drafts';

test('drafts', () => {
  expect(drafts).toMatchSnapshot();
});

test('draftsBySubject', () => {
  expect(draftsBySubject).toMatchSnapshot();
});

test('invalidDraft', () => {
  expect(invalidDraft).toMatchSnapshot();
});

test('validDraft', () => {
  expect(validDraft).toMatchSnapshot();
});
