export interface IVcitaClient {
  id: string;
  first_name: string;
  last_name: string;
  mobile_phone?: null;
  email: string;
  address?: null;
  created_at: string;
  updated_at: string;
  customer_status: string;
  tags?: (null)[] | null;
  opt_in: string;
  source: string;
  source_url?: null;
  channel: string;
  campaign?: null;
  business_uid: string;
}
