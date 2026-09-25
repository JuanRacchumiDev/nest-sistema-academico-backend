import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 3004)

  // Configura los límites del parser del body
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ extended: true, limit: '20mb' }));

  // --- CONFIGURACIÓN DE CORS ---
  const frontendUrl = configService.get<string>(
    'FRONTEND_URL',
    'https://app.innovaperu.edu.pe',
  );

  app.enableCors({
    origin: [
      frontendUrl,
      'https://app.innovaperu.edu.pe',
      'https://innovaperu.edu.pe',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Content-Disposition'], // Permite que el frontend lea el nombre del archivo enviado en las descargas
  });
  // -----------------------------

  // Pipe global para transformar y validar los datos recibidos en controladores
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  await app.listen(port);
  console.log(`Servidor corriendo en el puerto ${port}`);
}
await bootstrap();
