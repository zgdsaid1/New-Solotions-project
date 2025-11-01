export interface AIModelProvider {
  readonly name: string;
  generateText(prompt: string): Promise<string>;
}
