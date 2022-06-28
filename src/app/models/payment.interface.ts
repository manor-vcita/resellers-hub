export interface IVcitaPayment {
  id: string;
  state: string;
  title: string;
  note?: null;
  amount: number;
  currency: string;
  charged_at: string;
  client_id: string;
  conversation_id: string;
  payment_method: string;
  other_payment_method?: null;
  reference?: null;
  offline: boolean;
  payment_requests?: (PaymentRequestsEntity)[] | null;
  source_data: SourceData;
  created_at: string;
  updated_at: string;
  business_uid: string;
  staff_id: string;
  payable?: (PayableEntity)[] | null;
  is_deposit?: null;
}
export interface PaymentRequestsEntity {
  id: string;
}
export interface SourceData {
  name: string;
  channel: string;
  campaign?: null;
  website_url: string;
}
export interface PayableEntity {
  type: string;
  id: string;
}
