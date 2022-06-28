export interface IVcitaBusiness {
    admin_account: AdminAccount;
    business: Business;
    meta: Meta;
    integrations: Integrations;
  }
  export interface AdminAccount {
    user_id: number;
    first_name: string;
    last_name: string;
    display_name: string;
    email: string;
    country_name?: null;
    phone?: null;
    language: string;
  }
  export interface Business {
    id: string;
    name: string;
    short_description?: null;
    address?: null;
    time_zone: string;
    country_name?: null;
    phone?: null;
    business_category?: null;
    website_url?: null;
    hide_address: boolean;
    landing_page?: null;
    created_at: string;
    updated_at: string;
  }
  export interface Meta {
    plan: Plan;
    branding: Branding;
    note: string;
    tags?: null;
    in_setup: boolean;
    is_template: boolean;
    external_id?: null;
    identities?: (null)[] | null;
    intents?: (null)[] | null;
    auth_token: string;
    marketing_channel: string;
  }
  export interface Plan {
    plan_name: string;
    staff_slots: number;
    external_subscription_params?: null;
    expires_on: string;
  }
  export interface Branding {
    color: string;
    background_color: string;
    logo_url?: null;
  }
  export interface Integrations {
  }

