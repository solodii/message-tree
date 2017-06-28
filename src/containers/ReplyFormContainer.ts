import { connect } from 'react-redux';
import {
  bindActionCreators,
  Dispatch
} from 'redux';
import {
  changeDraft,
  cleanDraft,
  submitDraft
} from '../actions/drafts';
import * as selectors from '../state/selectors';
import { State } from '../state/types';
import ReplyFormComponent, {
  Props as ComponentProps
} from '../components/ReplyFormComponent';

export interface Props {
  subjectId: ComponentProps['subjectId'];
}

export interface StateProps {
  draft: ComponentProps['draft'];
  isValid: ComponentProps['isValid'];
}

export interface DispatchProps {
  onChange: ComponentProps['onChange'];
  onSubmit: ComponentProps['onSubmit'];
  onCancel: ComponentProps['onCancel'];
}

export function mapStateToProps(state: State, props: Props): StateProps {
  const { subjectId } = props;
  return {
    draft: selectors.getDraft(state, subjectId),
    isValid: selectors.isDraftValid(state, subjectId)
  };
}

export function mapDispatchToProps(dispatch: Dispatch<State>): DispatchProps {
  return bindActionCreators({
    onChange: changeDraft,
    onSubmit: submitDraft,
    onCancel: cleanDraft
  }, dispatch);
}

const ReplyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyFormComponent);

ReplyFormContainer.displayName = 'ReplyFormContainer';

export default ReplyFormContainer;
