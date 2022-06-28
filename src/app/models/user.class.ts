import { IUser, UserPermissions, UserType } from 'src/app/models/user.interface';

export class User {

  public user: IUser;

  constructor(
    public _user: IUser
  ) {
    this.user = {
      uid: this._user.uid,
      email: this._user.email,
      firstName: this._user.firstName,
      lastName: this._user.lastName,
      type: this._user.type,
      hubId: this._user.hubId,
      permissions: this._user.permissions,
      createdAt: this._user.createdAt
    }
  }
}
