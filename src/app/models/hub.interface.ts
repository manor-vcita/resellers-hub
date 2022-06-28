import { IReseller } from './reseller.interface';
import { IAccount } from "./account.interface";

export interface IHub {
  id: string;
  name: string;
  createdAt: any | Date;
  status: HubStatus,
  showCreateUserForm?: boolean;
}

export enum HubStatus {
  'Active' = 1,
  'Blocked'
}
