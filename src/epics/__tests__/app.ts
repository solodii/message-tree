import { ActionsObservable } from 'redux-observable';
import {
  createMiddlewareAPI,
  createDependencies
} from '../../mocks/helpers';
import { initApp } from '../../actions/app';
import { socketEpic } from '../app';

describe('socketEpic', () => {
  const store = createMiddlewareAPI();
  const dependencies = createDependencies();

  test('produces socket messages', () => {
    const epic$ = socketEpic(
      ActionsObservable.of(initApp()),
      store,
      dependencies
    );
    const socketMessage = { type: 'SOCKET_MESSAGE' };
    epic$
      .toArray()
      .subscribe((actions) =>
        expect(actions).toEqual([socketMessage])
      );    
    dependencies.socket.next(socketMessage);
    dependencies.socket.complete();
  });
});
