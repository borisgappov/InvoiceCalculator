import { AppState } from "../core/model/app-state";
import { createFeatureSelector } from "@ngrx/store";

export const appStateFeatureKey = "appState";
export const entityStateFeatureKey = "entityCache";

export const featureSelector = createFeatureSelector<State, AppState>(
  appStateFeatureKey
);

export interface State {
  appState: AppState;
}
