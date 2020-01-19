import { createSelector } from "@ngrx/store";
import { AppState } from "../core/model/app-state";
import * as selectors from "./app-state";

export const getCustomerFormData = createSelector(
  selectors.featureSelector,
  (state: AppState) => state.customerFormData
);

export const getCurrentCustomer = createSelector(
  selectors.featureSelector,
  (state: AppState) => state.currentCustomer
);

export const getPrevCustomerFormData = createSelector(
  selectors.featureSelector,
  (state: AppState) => state.prevCustomerFormData
);