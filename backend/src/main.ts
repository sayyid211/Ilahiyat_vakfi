import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS so the Next.js frontend can communicate with this API
  app.enableCors({
    origin: [
      'https://elazigilahiyatveharputilimvakfi.org',
      'https://www.elazigilahiyatveharputilimvakfi.org',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Explicitly set the backend to run on port 4000 to match our frontend api.ts
  await app.listen(4000, '0.0.0.0');
}
bootstrap();