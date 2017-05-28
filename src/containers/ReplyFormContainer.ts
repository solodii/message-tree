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
import * as fromReducers from '../reducers';
import { Draft } from '../reducers/draftsBySubject';
import ReplyFormComponent, {
  Props as ComponentProps
} from '../components/ReplyFormComponent';

type State = fromReducers.State;

export interface Props {
  subjectId?: string;
}

export interface StateProps {
  draft: Readonly<Draft>;
  isValid: boolean;
}

export interface DispatchProps {
  changeDraft: typeof changeDraft;
  submitDraft: typeof submitDraft;
  cleanDraft: typeof cleanDraft;
}

export function mapStateToProps(state: State, props: Props): StateProps {
  const { subjectId } = props;
  return {
    draft: fromReducers.getDraft(state, subjectId),
    isValid: fromReducers.isDraftValid(state, subjectId)
  };
}

export function mapDispatchToProps(dispatch: Dispatch<State>): DispatchProps {
  return bindActionCreators({
    changeDraft,
    submitDraft,
    cleanDraft
  }, dispatch);
}

export function mergeProps(
  stateProps: StateProps,
  dispatchProps: DispatchProps
): ComponentProps {
  const {
    draft: { subjectId }
  } = stateProps;
  const {
    changeDraft,
    submitDraft,
    cleanDraft
  } = dispatchProps;
  return {
    ...stateProps,
    onChange(value: string): void {        
      changeDraft(value, subjectId);
    },
    onSubmit(): void {
      submitDraft(subjectId);
    },
    onCancel(): void {
      cleanDraft(subjectId);
    }
  };
}

const ReplyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ReplyFormComponent);

ReplyFormContainer.displayName = 'ReplyFormContainer';

export default ReplyFormContainer;
