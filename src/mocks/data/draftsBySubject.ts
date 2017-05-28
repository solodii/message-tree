import {
  State,
  emptySubject
} from '../../reducers/draftsBySubject';

const data: State = {
  [emptySubject]: {
    subjectId: emptySubject,
    text: ''
  },
  '6c6f1976-ff5b-420b-bc9d-f7484f0ee53f': {
    subjectId: '6c6f1976-ff5b-420b-bc9d-f7484f0ee53f',
    text: 'fourth'
  }
};

export default data;

export const validSubject = '6c6f1976-ff5b-420b-bc9d-f7484f0ee53f';
export const invalidSubject = '';
export const nonexistentSubject = 'nonexistent-subject';
