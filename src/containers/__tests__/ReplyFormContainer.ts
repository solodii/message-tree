import {
  changeDraft,
  cleanDraft,
  submitDraft
} from '../../actions/drafts';
import data from '../../mocks/data';
import { validSubject } from '../../mocks/data/draftsBySubject';
import * as fromReducers from '../../reducers';
import { Props as ComponentProps } from '../../components/ReplyFormComponent';
import ReplyFormContainer, {
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
} from '../ReplyFormContainer';

describe('ReplyFormContainer', () => {
  test('displayName is "ReplyFormContainer"', () => {
    expect(ReplyFormContainer.displayName).toEqual('ReplyFormContainer');
  });

  describe('mergeProps', () => {
    const subjectId = validSubject;
    const dispatch = jest.fn();
    const props: ComponentProps = mergeProps(
      mapStateToProps(data, { subjectId }),
      mapDispatchToProps(dispatch)
    );

    test('properties contain appropriate draft', () => {
      expect(props.draft).toEqual(
        fromReducers.getDraft(data, subjectId)
      );
    });

    test('properties contain validity information', () => {
      expect(props.isValid).toEqual(
        fromReducers.isDraftValid(data, subjectId)
      );
    });

    test('onChange dispatches CHANGE_DRAFT action', () => {
      const value = Math.random().toString();
      expect(dispatch).not.toHaveBeenCalledWith(
        changeDraft(value, subjectId)
      );
      props.onChange(value);
      expect(dispatch).toHaveBeenCalledWith(
        changeDraft(value, subjectId)
      );
    });

    test('onCancel dispatches CLEAN_DRAFT action', () => {
      expect(dispatch).not.toHaveBeenCalledWith(
        cleanDraft(subjectId)
      );
      props.onCancel();
      expect(dispatch).toHaveBeenCalledWith(
        cleanDraft(subjectId)
      );
    });

    test('onSubmit dispatches SUBMIT_DRAFT action', () => {
      expect(dispatch).not.toHaveBeenCalledWith(
        submitDraft(subjectId)
      );
      props.onSubmit();
      expect(dispatch).toHaveBeenCalledWith(
        submitDraft(subjectId)
      );
    });
  });
});
