export default interface Supervisor {
  id: string;
  image: string;
  name: string;
  password: string;
  email: string;
  managerId: string;
  created_at: Date;
  companyId: string;
  job: string;
}
