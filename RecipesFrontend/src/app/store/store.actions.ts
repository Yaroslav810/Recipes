import { createAction, props } from "@ngrx/store";
import { User } from "./store.reducer";

export namespace StoreActions {
  export const setUser = createAction(
    'SET_USER', 
    props<{ user?: User }>(),
  );

  export const resetUser = createAction('RESET_USER');
}