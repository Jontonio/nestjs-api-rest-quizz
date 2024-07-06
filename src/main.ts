import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: true,
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "PUT", "POST", "DELETE", "UPDATE", "OPTIONS"],
    credentials: true,
  });

  await app.listen(configService.get("SERVER_PORT"));
}

bootstrap();
