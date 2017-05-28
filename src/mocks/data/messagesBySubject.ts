import {
  State,
  emptySubject
} from '../../reducers/messagesBySubject';

const data: State = {
  [emptySubject]: [
    {
      subjectId: emptySubject,
      text: 'first',
      id: '0a6a7bfd-a212-4ae1-8125-6c7486213a94',
      date: new Date()
    },
    {
      subjectId: emptySubject,
      text: 'third',
      id: '913d97b3-6e04-4c1e-a11c-222221abf00e',
      date: new Date()
    }
  ],
  '0a6a7bfd-a212-4ae1-8125-6c7486213a94': [
    {
      subjectId: '0a6a7bfd-a212-4ae1-8125-6c7486213a94',
      text: 'second',
      id: '6c6f1976-ff5b-420b-bc9d-f7484f0ee53f',
      date: new Date()
    }
  ]
};

export default data;

export const nonexistentSubject = 'nonexistent-subject';
