
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client.
// NOTE: process.env.API_KEY is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCameraAdvice = async (
  query: string,
  context?: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    const systemInstruction = `
      Bạn là chuyên gia tư vấn nhiếp ảnh cao cấp của 'Camera Pro Studio'.
      Phong cách: Chuyên nghiệp, tinh tế, am hiểu kỹ thuật nhưng diễn đạt dễ hiểu.
      Nhiệm vụ:
      1. Tư vấn máy ảnh, ống kính phù hợp với nhu cầu (chụp chân dung, phong cảnh, quay vlog, v.v.).
      2. Giải thích các thông số kỹ thuật (ISO, Khẩu độ, Tiêu cự) một cách đơn giản.
      3. So sánh các dòng máy Sony, Canon, Nikon, Fujifilm một cách khách quan.
      
      Nếu câu hỏi liên quan đến mua hàng, hãy hướng dẫn họ thêm vào giỏ hàng hoặc liên hệ hotline.
      Giữ câu trả lời ngắn gọn, súc tích, sử dụng định dạng danh sách (bullet points) nếu cần liệt kê.
      
      Bối cảnh hiện tại: ${context || 'Khách hàng đang xem trang chủ.'}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        // Removed maxOutputTokens to allow complete, detailed responses
      }
    });

    return response.text || "Xin lỗi, tôi chưa thể đưa ra câu trả lời ngay lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hệ thống tư vấn đang bận. Vui lòng thử lại sau giây lát.";
  }
};
