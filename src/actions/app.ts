export const INIT_APP = 'INIT_APP';

export interface InitApp {
  type: typeof INIT_APP;
}

export function initApp(): InitApp {
  return { type: INIT_APP };
}
