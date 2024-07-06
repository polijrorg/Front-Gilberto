import api from './api';

export default class PdfService {
  static async getPdf(sellerId: string, date: string): Promise<string | null> {
    const pdfResponse = await api.get(
      `/seller/generatePdf/${sellerId}/${date}`
    );
    return pdfResponse.data;
  }
}
