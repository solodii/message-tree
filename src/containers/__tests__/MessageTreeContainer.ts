import { createDraft } from '../../actions/drafts';
import { nonexistentSubject } from '../../mocks/data/messagesBySubject';
import data from '../../mocks/data';
import * as fromReducers from '../../reducers';
import MessageTreeContainer, {
  StateProps,
  DispatchProps,
  mapStateToProps,
  mapDispatchToProps
} from '../MessageTreeContainer';

describe('MessageTreeContainer', () => {
  test('displayName is "MessageTreeContainer"', () => {
    expect(MessageTreeContainer.displayName).toEqual('MessageTreeContainer');
  });

  describe('mapStateToProps', () => {
    const props: StateProps = mapStateToProps(data);

    test('hasMessages checks messages existence by subjectId', () => {
      const subjectIds = fromReducers.getMessagesSubjectIds(data);
      expect(
        subjectIds.map((id) => props.hasMessages(id))
      ).toEqual(
        subjectIds.map((id) => fromReducers.hasMessages(data, id))
      );
      expect(
        props.hasMessages(nonexistentSubject)
      ).toBeFalsy();
    });

    test('getMessages returns messages by subjectId', () => {
      const subjectIds = fromReducers.getMessagesSubjectIds(data);
      expect(
        subjectIds.map((id) => props.getMessages(id))
      ).toEqual(
        subjectIds.map((id) => fromReducers.getMessages(data, id))
      );
    });

    test('hasDraft checks draft existence by subjectId', () => {
      const subjectIds = fromReducers.getDraftsSubjectIds(data);
      expect(
        subjectIds.map((id) => props.hasDraft(id))
      ).toEqual(
        subjectIds.map((id) => fromReducers.hasDraft(data, id))
      );
      expect(
        props.hasDraft(nonexistentSubject)
      ).toBeFalsy();
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props: DispatchProps = mapDispatchToProps(dispatch);

    test('onReply dispatches CREATE_DRAFT action', () => {
      const subjectId = Math.random().toString();
      props.onReply(subjectId);
      expect(dispatch).toHaveBeenCalledWith(
        createDraft(subjectId)
      );
    });
  });
});
