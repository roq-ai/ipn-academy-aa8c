import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  rating: number;
  comment?: string;
  user_id?: string;
  trainer_id?: string;
  created_at?: any;
  updated_at?: any;

  user_review_user_idTouser?: UserInterface;
  user_review_trainer_idTouser?: UserInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  user_id?: string;
  trainer_id?: string;
}
