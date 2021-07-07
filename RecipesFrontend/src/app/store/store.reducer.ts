import { Action, createReducer, on } from "@ngrx/store"
import { StoreActions } from "./store.actions";

export interface User {
  name: string,
  login: string,
  about?: string,
}

export interface State {
  user?: User,
}

export const initialState: State = {
  user: null,
}

const storeReducer = createReducer(
  initialState,
  on(StoreActions.setUser, (state, { user }) => ({
    ...state,
    user: user,
  })),
  on(StoreActions.resetUser, state => ({
    ...state,
    user: null,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return storeReducer(state, action)
}
