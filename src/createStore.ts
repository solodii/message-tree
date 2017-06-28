import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs';
import rootEpic, { Dependencies } from './epics';
import rootReducer from './state/rootReducer';

export default function() {
  const dependencies: Dependencies = {
    socket: Observable.webSocket('ws://127.0.0.1:8000')
  };
  const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies });
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  );
}
