import {
  NONEXISTENT_SUBJECT,
  NONEXISTENT_MESSAGE,
  state,
  messagesById,
  messagesBySubject,
  messageTrees
} from '../../../mocks/data';
import { ROOT_SUBJECT } from '../../constants';
import * as selectors from '../messages';

describe('messages selectors', () => {
  test('getMessage returns message by id', () => {
    const { getMessage } = selectors;
    Object.keys(state)
      .forEach((id) =>
        expect(
            getMessage(state, id)
        ).toEqual(messagesById[id])
      );
    expect(
      getMessage(state, NONEXISTENT_MESSAGE)
    ).toBeUndefined();
  });

  test('getMessagesSubjects returns all subject ids', () => {
    const { getMessagesSubjects } = selectors;
    expect(
      getMessagesSubjects(state)
    ).toEqual(
      Object.keys(messagesBySubject)
    );
  });

  test('isSubject checks message group for existence by subjectId', () => {
    const { isSubject } = selectors;
    Object.keys(messagesBySubject)
      .forEach((subjectId) =>
        expect(
          isSubject(state, subjectId)
        ).toEqual(true)
      );
    expect(
      isSubject(state, NONEXISTENT_SUBJECT)
    ).toEqual(false);
  });

  test('getSubjectMessages returns messages with specific subjectId', () => {
    const { getSubjectMessages } = selectors;
    Object.keys(messagesBySubject)
      .forEach((subjectId) =>
        expect(
          getSubjectMessages(state, subjectId)
        ).toEqual(messagesBySubject[subjectId])
      );
    expect(
      getSubjectMessages(state, NONEXISTENT_SUBJECT)
    ).toBeUndefined();
  });

  test('getMessageTrees returns message trees', () => {
    const { getMessageTrees } = selectors;
    expect(
      getMessageTrees(state, ROOT_SUBJECT)
    ).toEqual(messageTrees);
  });
});
