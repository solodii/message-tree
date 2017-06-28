import { MiddlewareAPI } from 'redux';
import { State } from '../../state/types';
import { state } from '../data/state';

export function createMiddlewareAPI(): MiddlewareAPI<State> {
  return {
    dispatch: jest.fn(),
    getState: jest.fn(() => state)
  };
}
