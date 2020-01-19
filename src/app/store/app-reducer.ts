import { AppState } from "../core/model/app-state";
import { AppActionsUnion, AppActionTypes } from "./app-actions";
import { environment } from "../../environments/environment";

export const initialState = {
  customerFormData: {
    customerId: "",
    dateRange: [new Date(environment.customerFormSettings.minDate), new Date()]
  }
} as AppState;

export function appReducer(
  state: AppState = initialState,
  action: AppActionsUnion
): AppState {
  switch (action.type) {
    case AppActionTypes.SET_CUSTOMER_FORM:
      return {
        ...state,
        customerFormData: action.payload
      };
    case AppActionTypes.SET_PREVIOUS_FORM:
      return {
        ...state,
        prevCustomerFormData: action.payload
      };
    case AppActionTypes.SET_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomer: action.payload
      };
    default:
      return state;
  }
}
