import { WorkshopInterface } from 'interfaces/workshop';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CertificateInterface {
  id?: string;
  workshop_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  workshop?: WorkshopInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CertificateGetQueryInterface extends GetQueryInterface {
  id?: string;
  workshop_id?: string;
  user_id?: string;
}
