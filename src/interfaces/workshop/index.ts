import { CartItemInterface } from 'interfaces/cart-item';
import { CertificateInterface } from 'interfaces/certificate';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface WorkshopInterface {
  id?: string;
  title: string;
  description: string;
  vimeo_link: string;
  trainer_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  cart_item?: CartItemInterface[];
  certificate?: CertificateInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    cart_item?: number;
    certificate?: number;
  };
}

export interface WorkshopGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  vimeo_link?: string;
  trainer_id?: string;
  organization_id?: string;
}
