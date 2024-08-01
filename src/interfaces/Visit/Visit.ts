export default interface Visit {
  created_at: string | number | Date;
  id: string;
  visitTemplateId: string;
  storeVisited: string;
  dateVisited: string;
}
