import * as React from 'react';
import { Message } from '../reducers/messagesBySubject';
import ReplyFormContainer from '../containers/ReplyFormContainer';
import MessageComponent from './MessageComponent';

type ReplyCallback = (e: React.MouseEvent<HTMLAnchorElement>) => void;

export interface Props {
  hasMessages: (subjectId?: string) => boolean;
  getMessages: (subjectId?: string) => Message[];
  hasDraft: (subjectId?: string) => boolean;
  onReply: (subjectId: string) => void;
}

export default class MessageTreeComponent extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const { hasMessages } = this.props;
    return (
      <div>
        <ReplyFormContainer />
        {hasMessages() && this.renderList()}
      </div>
    );
  }

  private renderList(subjectId?: string): JSX.Element {
    const {
      hasMessages,
      getMessages,
      hasDraft
    } = this.props;

    const messages = getMessages(subjectId).map((message, index) => {
      const { id } = message;
      const replyFormOrLink = hasDraft(id)
        ? this.renderReplyForm(id)
        : this.renderReplyLink(id);      
      return (
        <div key={index}>
          <MessageComponent message={message} />
          {replyFormOrLink}
          {hasMessages(id) && this.renderList(id)}
        </div>
      );
    });

    return (
      <div className="message-list">
        {messages}
      </div>
    );
  }

  private renderReplyForm(id: string): JSX.Element {
    return <ReplyFormContainer subjectId={id} />;
  }

  private renderReplyLink(id: string): JSX.Element {
    return (
      <a
        className="reply"
        href="#"
        onClick={this.onReplyClick(id)}
      >
        reply
      </a>
    );
  }

  private onReplyClick(subjectId: string): ReplyCallback {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      this.props.onReply(subjectId);
    };
  }
}
