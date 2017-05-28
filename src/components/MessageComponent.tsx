import * as React from 'react';
import * as dateformat from 'dateformat';
import { Message } from '../reducers/messagesBySubject';

export interface Props {
  message: Readonly<Message>;
}

export default function MessageComponent(props: Props): JSX.Element {
  const {
    message: {
      date,
      text
    }
  } = props;  
  return (
    <div className="message">
      <div><span>{dateformat(date)}</span></div>
      <div><span>{text}</span></div>
    </div>
  );
}
