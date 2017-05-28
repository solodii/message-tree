import * as React from 'react';
import { shallow } from 'enzyme';
import data from '../../mocks/data';
import * as fromReducers from '../../reducers';
import { Message } from '../../reducers/messagesBySubject';
import { Draft } from '../../reducers/draftsBySubject';
import MessageTreeComponent, { Props } from '../MessageTreeComponent';

describe('MessageTreeComponent without data', () => {
  const onReply = jest.fn();
  const initialProps: Props = {
    hasMessages: jest.fn(() => false),
    getMessages: jest.fn(),
    hasDraft: jest.fn(),
    onReply
  };
  const wrapper = shallow<Props, {}>(
    <MessageTreeComponent {...initialProps} />
  );

  test('.message-list nodes are not rendred', () => {
    const nodes = wrapper.find('.message-list');
    expect(nodes.length).toEqual(0);
  });

  test('ReplyFormContainer is rendered once for default draft', () => {
    const nodes = wrapper.find('ReplyFormContainer');
    expect(nodes.length).toEqual(1);
    expect(nodes.props()).toMatchObject({});
  });

  test('MessageComponent nodes are not rendered', () => {
    const nodes = wrapper.find('MessageComponent');
    expect(nodes.length).toEqual(0);
  });

  test('.reply nodes are not rendered', () => {
    const nodes = wrapper.find('.reply');
    expect(nodes.length).toEqual(0);
  });

  test('onReply is not called', () => {
    expect(onReply).toHaveBeenCalledTimes(0);
  });
});

describe('MessageTreeComponent with data', () => {
  const { messagesBySubject } = data;
  const messages: Message[] = Object.keys(messagesBySubject)
    .reduce((res: Message[], subjectId) =>
      messagesBySubject[subjectId].concat(res), []
    );
  const { draftsBySubject } = data;
  const drafts = Object.keys(draftsBySubject)
    .reduce((res: Draft[], subjectId) =>
      res.concat(draftsBySubject[subjectId]), []
    );
  const onReply = jest.fn();
  const initialProps: Props = {
    hasMessages: jest.fn((id: string) => fromReducers.hasMessages(data, id)),
    getMessages: jest.fn((id: string) => fromReducers.getMessages(data, id)),
    hasDraft: jest.fn((id: string) => fromReducers.hasDraft(data, id)),
    onReply
  };
  const wrapper = shallow<Props, {}>(
    <MessageTreeComponent {...initialProps} />
  );

  test('.message-list is rendered for each messages', () => {
    const nodes = wrapper.find('.message-list');
    expect(nodes.length).toEqual(
      Object.keys(messagesBySubject).length
    );
  });

  test('ReplyFormContainer is rendered for each draft', () => {
    const nodes = wrapper.find('ReplyFormContainer');    
    const accordance = drafts
      .every((draft) => 
        nodes.filterWhere((n) =>
          draft.subjectId
            ? n.prop('subjectId') === draft.subjectId
            : !n.props().hasOwnProperty('subjectId')
        ).length === 1
      );    
    expect(accordance).toBeTruthy();
  });

  test('MessageComponent is rendered for each message', () => {
    const nodes = wrapper.find('MessageComponent');
    const accordance = messages
      .every((msg) => 
        nodes.filterWhere((n) => n.prop('message') === msg).length === 1
      );
    expect(accordance).toBeTruthy();
  });

  test('.reply is rendered for each message without reply draft', () => {
    const nodes = wrapper.find('.reply');
    const filtered = messages
      .filter((msg) =>
        drafts.every((draft) => draft.subjectId !== msg.id)
      );
    expect(nodes.length).toEqual(filtered.length);
  });

  test('onReply is called for each message without reply draft', () => {
    wrapper.find('.reply')
      .forEach((node) =>
        node.simulate('click', { preventDefault: jest.fn() })
      );
    const { calls } = onReply.mock;
    const accordance = messages
      .filter((msg) =>
        drafts.every((draft) => draft.subjectId !== msg.id)
      )
      .every((msg) =>
        calls.filter((args) => args[0] === msg.id).length === 1
      );
    expect(accordance).toBeTruthy();
  });
});
