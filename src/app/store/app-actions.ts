import { Action } from "@ngrx/store";
import { CustomerFormData } from "../core/model/customer-form-data";
import { Customer } from "../core/model/customer";

export enum AppActionTypes {
  SET_CUSTOMER_FORM = "[CUSTOMER FORM] Set customer form data after submission",
  SET_PREVIOUS_FORM = "[CUSTOMER FORM] Set previous customer form data",
  SET_CURRENT_CUSTOMER = "[CUSTOMER FORM] Set current customer form data after submission"
}

export class SetCustomerFormData implements Action {
  public readonly type = AppActionTypes.SET_CUSTOMER_FORM;

  constructor(public payload: CustomerFormData) {}
}

export class SetPrevCustomerFormData implements Action {
  public readonly type = AppActionTypes.SET_PREVIOUS_FORM;

  constructor(public payload: CustomerFormData) {}
}

export class SetCurrentCustomer implements Action {
  public readonly type = AppActionTypes.SET_CURRENT_CUSTOMER;

  constructor(public payload: Customer) {}
}

export type AppActionsUnion =
  | SetCustomerFormData
  | SetPrevCustomerFormData
  | SetCurrentCustomer;
