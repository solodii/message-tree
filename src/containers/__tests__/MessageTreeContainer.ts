import { createDraft } from '../../actions/drafts';
import {
  state,
  messageTrees
} from '../../mocks/data';
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
    const props: StateProps = mapStateToProps(state);

    test('messageTrees is appropriate', () => {
      expect(props.messageTrees).toEqual(messageTrees);
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
