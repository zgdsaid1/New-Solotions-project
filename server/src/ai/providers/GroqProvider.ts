import Groq from "groq-sdk";
import { AIModelProvider } from "../routing.js";

export class GroqProvider implements AIModelProvider {
  public readonly name = "Groq";
  private client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing GROQ_API_KEY");
    this.client = new Groq({ apiKey });
  }

  async generateText(prompt: string): Promise<string> {
    const result = await this.client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    return result.choices[0]?.message?.content ?? "";
  }
}