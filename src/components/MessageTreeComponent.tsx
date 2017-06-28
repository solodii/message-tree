import * as React from 'react';
import { MessageTree } from '../state/types';
import { ROOT_SUBJECT } from '../state/constants';
import ReplyFormContainer from '../containers/ReplyFormContainer';
import MessageComponent from './MessageComponent';

type ReplyCallback = (e: React.MouseEvent<HTMLAnchorElement>) => void;

export interface Props {
  messageTrees: MessageTree[];
  onReply: (subjectId: string) => void;
}

export default class MessageTreeComponent extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const treeCmp = this.renderTrees(
      this.props.messageTrees
    );
    return (
      <div>
        <ReplyFormContainer subjectId={ROOT_SUBJECT} />
        {treeCmp}
      </div>
    );
  }

  private renderTrees(messageTrees: MessageTree[]): JSX.Element {
    const trees = messageTrees.map((tree, index) => {
      const {
        message,
        hasDraft,
        children
      } = tree;
      const replyFormOrLink = hasDraft
        ? this.renderReplyForm(message.id)
        : this.renderReplyLink(message.id);
      const subtrees = this.renderTrees(children);
      return (
        <div key={index}>
          <MessageComponent message={message} />
          {replyFormOrLink}
          {subtrees}
        </div>
      );
    });
    return <div className="message-trees">{trees}</div>;
  }

  private renderReplyForm(subjectId: string): JSX.Element {
    return <ReplyFormContainer subjectId={subjectId} />;
  }

  private renderReplyLink(subjectId: string): JSX.Element {
    return (
      <a
        className="reply"
        href="#"
        onClick={this.onReplyClick(subjectId)}
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
