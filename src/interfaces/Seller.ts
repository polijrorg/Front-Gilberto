export default interface Seller {
  [x: string]: number;
  image: string;
  id: string;
  email: string;
  name: string;
  supervisorId: string;
  companyId: string;
  created_at: Date;
  job: string;
}
