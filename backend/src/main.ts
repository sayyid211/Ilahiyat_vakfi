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

  app.setGlobalPrefix('api');

  // 2. Explicitly set the backend to run on port 4000 to match our frontend api.ts
  await app.listen(4000, '0.0.0.0');
}
bootstrap().catch((err) => {
  // Ensure unhandled rejections are logged and process exits with non-zero code
  // This satisfies the requirement to handle the returned Promise.
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
