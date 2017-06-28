export interface Message {
  id: string;
  subjectId: string;
  date: Date;
  text: string;
}

export interface Draft {
  subjectId: string;
  text: string;
}

export interface MessagesById {
  [id: string]: Message;
}

export interface MessagesBySubject {
  [subjectId: string]: Message[];
}

export interface DraftsBySubject {
  [subjectId: string]: Draft;
}

export interface State {
  draftsBySubject: DraftsBySubject;
  messagesById: MessagesById;
  messagesBySubject: MessagesBySubject;
}

export interface MessageTree {
  message: Message;
  children: MessageTree[];
  hasDraft: boolean;
}
