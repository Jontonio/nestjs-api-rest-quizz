import { Module } from "@nestjs/common";
import { ConfigModule as MyConfig } from "@nestjs/config";
import { config } from "dotenv";

@Module({
  imports: [
    MyConfig.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class ConfigModule {}
