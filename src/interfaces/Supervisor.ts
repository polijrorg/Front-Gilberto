export default interface Supervisor {
  id: string;
  image: string;
  name: string;
  password: string;
  email: string;
  managerId: string;
  created_at: Date;
  company: string;
  job: string;
}
