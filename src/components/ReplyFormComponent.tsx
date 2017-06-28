import * as React from 'react';
import { Draft } from '../state/types';

export interface Props {
  subjectId: string;
  draft: Readonly<Draft>;
  isValid: boolean;
  onChange: (value: string, subjectId: string) => void;
  onCancel: (subjectId: string) => void;
  onSubmit: (subjectId: string) => void;
}

export default class ReplyFormComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render(): JSX.Element {
    const {
      draft: { text },
      isValid
    } = this.props;
    return (
      <div className="form">
        <div>
          <textarea
            className="input"
            autoFocus={true}
            placeholder="Type your message here..."
            value={text}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <button
            className="cancel"
            onClick={this.onCancel}
          >
            Cancel
          </button>
          <button
            className="submit"
            disabled={!isValid}
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  private onInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChange(e.target.value, this.props.subjectId);
  }

  private onCancel(): void {
    this.props.onCancel(this.props.subjectId);
  }

  private onSubmit(): void {
    this.props.onSubmit(this.props.subjectId);
  }
}
