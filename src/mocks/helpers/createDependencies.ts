import { Subject } from 'rxjs';
import { Dependencies } from '../../epics';

export default function createDependencies(): Dependencies {
  const dependencies = { socket: new Subject() };
  return dependencies as Dependencies;
}
