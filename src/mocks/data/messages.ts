import {
  Message,
  MessagesById,
  MessagesBySubject,
  MessageTree
} from '../../state/types';
import { ROOT_SUBJECT } from '../../state/constants';

export const messages: Message[] = [
  {
    subjectId: ROOT_SUBJECT,
    text: 'first',
    id: '0a6a7bfd-a212-4ae1-8125-6c7486213a94',
    date: new Date(2016, 10, 10, 10, 1)
  },
  {
    subjectId: ROOT_SUBJECT,
    text: 'second',
    id: '6c6f1976-ff5b-420b-bc9d-f7484f0ee53f',
    date: new Date(2016, 10, 10, 10, 2)
  },
  {
    subjectId: '0a6a7bfd-a212-4ae1-8125-6c7486213a94',
    text: 'third',
    id: '913d97b3-6e04-4c1e-a11c-222221abf00e',
    date: new Date(2016, 10, 10, 10, 3)
  }
];

export const messagesById: MessagesById = {
  [messages[0].id]: messages[0],
  [messages[1].id]: messages[1],
  [messages[2].id]: messages[2]
};

export const messagesBySubject: MessagesBySubject = {
  [messages[0].subjectId]: [
    messages[0],
    messages[1]
  ],
  [messages[2].subjectId]: [
    messages[2]
  ]
};

export const messagesWithDraft = [
  messages[0]
];

export const messagesWithoutDraft = [
  messages[1],
  messages[2]
];

export const messageTrees: MessageTree[] = [
  {
    message: messages[0],
    hasDraft: messagesWithDraft.indexOf(messages[0]) !== -1,
    children: [
      {
        message: messages[2],
        hasDraft: messagesWithDraft.indexOf(messages[2]) !== -1,
        children: []
      }
    ]
  },
  {
    message: messages[1],
    hasDraft: messagesWithDraft.indexOf(messages[1]) !== -1,
    children: []
  }
];
