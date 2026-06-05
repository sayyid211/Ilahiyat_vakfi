import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS so the Next.js frontend can communicate with this API
  app.enableCors({
    origin: '*', // For development, allow all origins. You can restrict this to 'http://localhost:3000' later.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // 2. Explicitly set the backend to run on port 4000 to match our frontend api.ts
  await app.listen(4000, '0.0.0.0');
}
bootstrap();