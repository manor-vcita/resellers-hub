import { HubStatus, IHub } from './hub.interface';

export class Hub implements IHub {
  id: string
  name: string
  createdAt: any | Date
  status: HubStatus
  showCreateUserForm?: boolean

  constructor() {
    this.id = 'null';
    this.name = 'null';
    this.createdAt = null;
    this.status = HubStatus.Active;
    this.showCreateUserForm = false;
  }
}
