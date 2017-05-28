import { MiddlewareAPI } from 'redux';
import { State } from '../../reducers';
import data from '../data';

export default function createMiddlewareAPI(): MiddlewareAPI<State> {
  return {
    dispatch: jest.fn(),
    getState: jest.fn(() => data)
  };
}
