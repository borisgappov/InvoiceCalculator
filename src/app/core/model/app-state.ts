import { CustomerFormData } from "./customer-form-data";
import { Customer } from './customer';

export interface AppState {
  customerFormData: CustomerFormData;
  prevCustomerFormData: CustomerFormData;
  currentCustomer: Customer;
}
