export interface IBusiness {
  id: string,
  name: string;
  createdAt: Date | any;
  resellerId: string;
  hubId: string;
  isTemplate: boolean;
  baseTemplateAccountId: string;
  baseTemplateAccountName: string;
}
