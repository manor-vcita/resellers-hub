export interface IVcitaStaffMember {
  id: string;
  first_name: string;
  last_name?: null;
  display_name: string;
  email: string;
  professional_title: string;
  role: string;
  active: boolean;
  deleted: boolean;
  invite_sent?: null;
  created_at: string;
  updated_at: string;
  business_uid: string;
  mobile_number?: null;
  photo?: null;
}
