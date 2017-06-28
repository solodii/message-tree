import * as React from 'react';
import { shallow } from 'enzyme';
import {
  invalidDraft,
  validDraft
} from '../../mocks/data';
import { MockCmpData } from '../../mocks/helpers';
import ReplyFormComponent, { Props } from '../ReplyFormComponent';

describe('ReplyFormComponent', () => {
  const validMockData = createCmpWithValidDraft();
  const invalidMockData = createCmpWithInvalidDraft();

  describe('VALID_DRAFT_SUBJECT', () => {
    test('renders correctly', () => {
      expect(validMockData.wrapper).toMatchSnapshot();
    });
  });

  describe('INVALID_DRAFT_SUBJECT', () => {
    test('renders correctly', () => {
      expect(invalidMockData.wrapper).toMatchSnapshot();
    });
  });

  describe('callbacks', () => {
    const {
      initialProps: {
        subjectId,
        onChange,
        onCancel,
        onSubmit
      },
      wrapper
    } = validMockData;

    test('.input onChange is called after input change', () => {
      const value = Math.random().toString();
      expect(onChange).not.toHaveBeenCalled();
      wrapper.find('.input').simulate('change', {
        target: { value }
      });
      expect(onChange).toHaveBeenCalledWith(value, subjectId);
    });

    test('onCancel is called after click', () => {
      expect(onCancel).not.toHaveBeenCalled();
      wrapper.find('.cancel').simulate('click');
      expect(onCancel).toHaveBeenCalledWith(subjectId);
    });

    test('onSubmit is called after click', () => {
      expect(onSubmit).not.toHaveBeenCalled();
      wrapper.find('.submit').simulate('click');
      expect(onSubmit).toHaveBeenCalledWith(subjectId);
    });
  });
});

function createCmpWithValidDraft(): MockCmpData<Props> {
  const initialProps: Props = {
    subjectId: validDraft.subjectId,
    draft: validDraft,
    isValid: true,
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn()
  };
  const wrapper = shallow<Props, {}>(
    <ReplyFormComponent {...initialProps} />
  );
  return {
    initialProps,
    wrapper
  };
}

function createCmpWithInvalidDraft(): MockCmpData<Props> {
  const initialProps: Props = {
    subjectId: invalidDraft.subjectId,
    draft: invalidDraft,
    isValid: false,
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onCancel: jest.fn()
  };
  const wrapper = shallow<Props, {}>(
    <ReplyFormComponent {...initialProps} />
  );
  return {
    initialProps,
    wrapper
  };
}
