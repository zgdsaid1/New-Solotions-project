import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIModelProvider } from "../routing.js";

export class GeminiProvider implements AIModelProvider {
      public readonly name = "Gemini";

        private model;

          constructor() {
                const key = process.env.GEMINI_API_KEY;
                    if (!key) throw new Error("GEMINI_API_KEY missing");
                        const genAI = new GoogleGenerativeAI(key);
                            this.model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
});
          }

            async generateText(prompt: string): Promise<string> {
                    try {
                              const result = await this.model.generateContent(prompt);
                                    return result.response.text();
                    } catch (err) {
                              console.error("[Gemini Error]:", err);
                                    throw new Error("Gemini request failed");
                    }
            }
}