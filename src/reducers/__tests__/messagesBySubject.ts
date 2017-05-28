import {
  loadMessages,
  appendMessage
} from '../../actions/messages';
import messages from '../../mocks/data/messages';
import data, * as fromData from '../../mocks/data/messagesBySubject';
import reducer, * as fromMessagesBySubject from '../messagesBySubject';

type State = fromMessagesBySubject.State;

test('emptySubject is empty string', () => {
  expect(fromMessagesBySubject.emptySubject).toEqual('');
});

describe('messagesBySubject reducer', () => {
  describe('default case', () => {
    const action = { type: 'DEFAULT' };

    test('returns empty object if previous state is undefined', () => {
      const current = (reducer as any)(undefined, action);
      expect(current).toEqual({});
    });

    test('returns previous state', () => {
      const current = (reducer as any)(data, action);
      expect(current).toEqual(data);
    });
  });

  describe('LOAD_MESSAGES case', () => {
    const previous: State = {};
    const current = reducer(previous, loadMessages(messages));

    test('state is immutable', () => {
      expect(current).not.toBe(previous);
    });

    test('groups messages by subject', () => {
      messages.forEach((msg) => {
        expect(Object.keys(current)).toContain(msg.subjectId);
        expect(current[msg.subjectId]).toContain(msg);
      });
    });
  });

  describe('APPEND_MESSAGE case', () => {
    let previous: State;
    let current: State = {};

    messages.forEach((msg) => {
      previous = current;
      current = reducer(previous, appendMessage(msg));
    });

    test('state is immutable', () => {
      expect(current).not.toBe(previous);
    });

    test('appends message to appropriate group', () => {
      messages.forEach((msg) => {
        expect(Object.keys(current)).toContain(msg.subjectId);
        expect(current[msg.subjectId]).toContain(msg);
      });
    });
  });
});

describe('messagesBySubject selectors', () => {
  test('getSubjectIds returns all subject ids', () => {
    expect(
      fromMessagesBySubject.getSubjectIds(data)
    ).toEqual(Object.keys(data));
  });

  test('hasMessages checks message group for existence by subjectId', () => {
    const { hasMessages } = fromMessagesBySubject;

    Object.keys(data)
      .forEach((subjectId) =>
        expect(hasMessages(data, subjectId)).toEqual(true)
      );
    expect(hasMessages(data, fromData.nonexistentSubject)).toEqual(false);
    expect(
      hasMessages(data)
    ).toEqual(
      hasMessages(data, fromMessagesBySubject.emptySubject)
    );
  });

  test('getMessages returns message group by subjectId', () => {
    const { getMessages } = fromMessagesBySubject;

    Object.keys(data)
      .forEach((subjectId) =>
        expect(getMessages(data, subjectId)).toEqual(data[subjectId])
      );
    expect(getMessages(data, fromData.nonexistentSubject)).toBeUndefined();
    expect(
      getMessages(data)
    ).toEqual(
      getMessages(data, fromMessagesBySubject.emptySubject)
    );
  });
});
