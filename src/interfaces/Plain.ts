import Seller from './Seller';
import Supervisor from './Supervisor';

export default interface Plains {
  id: string;
  prize: string;
  comments: string;
  title: string;
  sellerId: string;
  done: boolean;
  supervisorId: string;
  visitId: string | null;
  moduleId: string | null;
  seller: Seller;
  supervisivor: Supervisor;
}
