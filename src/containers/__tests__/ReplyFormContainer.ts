import {
  changeDraft,
  cleanDraft,
  submitDraft
} from '../../actions/drafts';
import {
  validDraft,
  invalidDraft,
  state
} from '../../mocks/data';
import ReplyFormContainer, {
  StateProps,
  DispatchProps,
  mapStateToProps,
  mapDispatchToProps
} from '../ReplyFormContainer';

describe('ReplyFormContainer', () => {
  test('displayName is "ReplyFormContainer"', () => {
    expect(ReplyFormContainer.displayName).toEqual('ReplyFormContainer');
  });

  describe('mapStateToProps', () => {
    describe('validDraft', () => {
      const props: StateProps = mapStateToProps(state, {
        subjectId: validDraft.subjectId
      });

      test('properties contain valid draft', () => {
        expect(props.draft).toEqual(validDraft);
      });

      test('validity is true', () => {
        expect(props.isValid).toEqual(true);
      });
    });

    describe('invalidDraft', () => {
      const props: StateProps = mapStateToProps(state, {
        subjectId: invalidDraft.subjectId
      });

      test('properties contain invalid draft', () => {
        expect(props.draft).toEqual(invalidDraft);
      });

      test('validity is false', () => {
        expect(props.isValid).toEqual(false);
      });
    });
  });

  describe('mapDispatchToProps', () => {
    const { subjectId } = validDraft;
    const dispatch = jest.fn();
    const props: DispatchProps = mapDispatchToProps(dispatch);

    test('onChange dispatches CHANGE_DRAFT action', () => {
      const value = Math.random().toString();
      expect(dispatch).not.toHaveBeenCalledWith(
        changeDraft(value, subjectId)
      );
      props.onChange(value, subjectId);
      expect(dispatch).toHaveBeenCalledWith(
        changeDraft(value, subjectId)
      );
    });

    test('onCancel dispatches CLEAN_DRAFT action', () => {
      expect(dispatch).not.toHaveBeenCalledWith(
        cleanDraft(subjectId)
      );
      props.onCancel(subjectId);
      expect(dispatch).toHaveBeenCalledWith(
        cleanDraft(subjectId)
      );
    });

    test('onSubmit dispatches SUBMIT_DRAFT action', () => {
      expect(dispatch).not.toHaveBeenCalledWith(
        submitDraft(subjectId)
      );
      props.onSubmit(subjectId);
      expect(dispatch).toHaveBeenCalledWith(
        submitDraft(subjectId)
      );
    });
  });
});
