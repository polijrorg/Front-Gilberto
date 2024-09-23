export default interface QuestionsGrade {
  id: string;
  grade: number;
  sellerId: string;
  questionsId: string;
  visitId: string;
  comments?: string;
}
