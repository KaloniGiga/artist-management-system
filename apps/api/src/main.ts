import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { VersioningType } from "@nestjs/common";
import { json, urlencoded } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable api versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));

  const clientUrl = configService.get("CLIENT_URL");
  app.enableCors({
    origin: [clientUrl],
    credentials: true,
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle("Artist Management System API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      requestInterceptor: (req: { credentials: string }) => {
        req.credentials = "include";
        return req;
      },
    },
  });

  const port = configService.get("PORT");
  await app.listen(port || 4000);
}
bootstrap();
