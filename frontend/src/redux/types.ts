import store from './store';
import * as actions from './actions';

export type RootState = ReturnType<typeof store.getState>;