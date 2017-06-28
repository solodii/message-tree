import {
  loadMessages,
  appendMessage
} from '../../../actions/messages';
import {
  messages,
  messagesById as state
} from '../../../mocks/data';
import { MessagesById as State } from '../../types';
import reducer from '../messagesById';

describe('messagesById reducer', () => {
  describe('default case', () => {
    const action = { type: 'DEFAULT' };

    test('returns empty object if previous state is undefined', () => {
      const current = (reducer as any)(undefined, action);
      expect(current).toEqual({});
    });

    test('returns previous state', () => {
      const current = (reducer as any)(state, action);
      expect(current).toEqual(state);
    });
  });

  describe('LOAD_MESSAGES case', () => {
    const previous: State = {};
    const current = reducer(previous, loadMessages(messages));

    test('state is immutable', () => {
      expect(current).not.toBe(previous);
    });

    test('groups messages by id', () => {
      expect(current).toEqual(state);
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

    test('appends message by id', () => {
      expect(current).toEqual(state);
    });
  });
});
