import * as React from 'react';
import { Draft } from '../reducers/draftsBySubject';

export interface Props {
  draft: Readonly<Draft>;
  isValid: boolean;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export default class ReplyFormComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
  }

  public render(): JSX.Element {
    const {
      draft: { text },
      isValid,
      onCancel,
      onSubmit
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
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="submit"
            disabled={!isValid}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  private onInputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.onChange(e.target.value);
  }
}
