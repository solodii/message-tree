import * as React from 'react';
import { shallow } from 'enzyme';
import ReplyFormComponent, { Props } from '../ReplyFormComponent';

describe('ReplyFormComponent', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const onCancel = jest.fn();
  const initialProps: Props = {
    draft: {
      subjectId: '',
      text: Math.random().toString()
    },
    isValid: false,
    onChange,
    onSubmit,
    onCancel
  };
  const wrapper = shallow<Props, {}>(
    <ReplyFormComponent {...initialProps} />
  );

  test('is .form', () => {
    expect(wrapper.is('.form')).toBeTruthy();
  });

  describe('.input', () => {
    const input = wrapper.find('.input');

    test('is rendered once', () => {
      expect(input.length).toEqual(1);
    });

    test('autoFocus is true', () => {
      expect(input.prop('autoFocus')).toBeTruthy();
    });

    test('has a placeholder', () => {
      expect(input.prop('placeholder')).toEqual('Type your message here...');
    });

    test('value equals to draft.text', () => {
      expect(input.prop('value')).toEqual(initialProps.draft.text);
    });

    test('onChange is called after input change', () => {
      const value = Math.random().toString();
      expect(onChange).not.toHaveBeenCalledWith(value);
      input.simulate('change', {
        target: { value }
      });
      expect(onChange).toHaveBeenCalledWith(value);
    });
  });

  describe('.cancel', () => {
    const cancel = wrapper.find('.cancel');

    test('is rendered once', () => {
      expect(cancel.length).toEqual(1);
    });

    test('is a button', () => {
      expect(cancel.type()).toEqual('button');
    });

    test('has a text', () => {
      expect(cancel.text()).toEqual('Cancel');
    });

    test('onCancel is called after click', () => {
      expect(onCancel).not.toHaveBeenCalled();
      cancel.simulate('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('.submit', () => {
    const submitDraft = wrapper.find('.submit');

    test('is rendered once', () => {
      expect(submitDraft.length).toEqual(1);
    });

    test('is a button', () => {
      expect(submitDraft.type()).toEqual('button');
    });

    test('has a text', () => {
      expect(submitDraft.text()).toEqual('Submit');
    });

    test('disabled if draft not valid', () => {
      expect(submitDraft.prop('disabled')).toEqual(!initialProps.isValid);
    });

    test('onSubmit is called after click', () => {
      expect(onSubmit).not.toHaveBeenCalled();
      submitDraft.simulate('click');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
