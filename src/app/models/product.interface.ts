export interface IVcitaProduct {
  id: string;
  business_id: string;
  staff_id: string;
  name: string;
  description: string;
  display: boolean;
  price: string;
  currency: string;
  total_price: string;
  taxes?: (null)[] | null;
  image_url?: null;
  created_at: string;
  updated_at: string;
}
