export interface IUser {
  uid: string; // corresponds to the Firebase user uid
  type: UserType;
  hubId?: string;
  resellerId?: string;
  firstName: string;
  lastName: string;
  email: string;
  permissions: UserPermissions[];
  createdAt: Date;
}


export enum UserType {
  vcita = 1,
  partner = 2,
  reseller = 3
}

export enum UserPermissions {
  vcitaAdmin = 1,
  vcitaViewer = 2,
  partnerAdmin = 3,
  partnerViewer = 4,
  resellerAdmin = 5,
  resellerViewer = 6
}
