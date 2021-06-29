import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./store.reducer";

export namespace StoreSelectors {
  export const state = createFeatureSelector<State>('state');

  export const user = createSelector(state, state => state.user);
}
