import {
  messages,
  messagesById,
  messagesBySubject,
  messagesWithDraft,
  messagesWithoutDraft,
  messageTrees
} from '../messages';

test('messages', () => {
  expect(messages).toMatchSnapshot();
});

test('messagesById', () => {
  expect(messagesById).toMatchSnapshot();
});

test('messagesBySubject', () => {
  expect(messagesBySubject).toMatchSnapshot();
});

test('messagesWithDraft', () => {
  expect(messagesWithDraft).toMatchSnapshot();
});

test('messagesWithoutDraft', () => {
  expect(messagesWithoutDraft).toMatchSnapshot();
});

test('messageTrees', () => {
  expect(messageTrees).toMatchSnapshot();
});
