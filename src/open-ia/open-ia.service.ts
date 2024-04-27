import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class OpenIaService {
  private readonly apiKey: string;
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.get("API_KEY_OPEN_IA"),
    });
  }

  async interpretarDatos(data: string) {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${this.configService.get(
              "PROMT_INTERPRETAR_01",
            )} ${data}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      return chatCompletion.choices[0].message;
    } catch (error) {
      console.error("Error al generar texto:", error);
      throw error;
    }
  }
}
