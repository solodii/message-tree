import { initApp } from '../../actions/app';
import AppContainer, {
  DispatchProps,
  mapDispatchToProps
} from '../AppContainer';

describe('AppContainer', () => {
  test('displayName is "AppContainer"', () => {
    expect(AppContainer.displayName).toEqual('AppContainer');
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props: DispatchProps = mapDispatchToProps(dispatch);

    test('initApp dispatches INIT_APP action', () => {
      expect(dispatch).not.toHaveBeenCalled();
      props.initApp();
      expect(dispatch).toHaveBeenCalledWith(initApp());
    });
  });
});
