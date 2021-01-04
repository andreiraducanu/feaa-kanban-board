import store from './store';
import * as actions from './actions';

export type RootState = ReturnType<typeof store.getState>

export type LoginAction = typeof actions.login;
export type LogoutAction = typeof actions.logout;