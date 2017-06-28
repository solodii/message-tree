import { ShallowWrapper } from 'enzyme';

export interface MockCmpData<P, S = {}> {
  wrapper: ShallowWrapper<P, S>;
  initialProps: P;
}
