import { Module } from '@nestjs/common';
import { CertificadosModule } from './certificados/certificados.module.js';
import { DetalleParametrosModule } from './detalle-parametros/detalle-parametros.module.js'
import { InstitucionesModule } from './instituciones/instituciones.module.js'
import { ModulosModule } from './modulos/modulos.module.js'
import { ParametrosModule } from './parametros/parametros.module.js'
import { PersonasModule } from './personas/personas.module.js'
import { PlantillasModule } from './plantillas/plantilla.module.js'
import { ProgramasModule } from './programas/programas.module.js'
import { Certificado } from './certificados/entities/certificado.entity.js'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './personas/entities/persona.entity.js';
import { DetalleParametro } from './detalle-parametros/entities/detalle-parametro.entity.js';
import { Institucion } from './instituciones/entities/institucion.entity.js';
import { Modulo } from './modulos/entities/modulo.entity.js';
import { Parametro } from './parametros/entities/parametro.entity.js';
import { Plantilla } from './plantillas/entities/plantilla.entity.js';
import { Programa } from './programas/entities/programa.entity.js';

@Module({
  imports: [
    // Se configuran múltiples rutas para asegurar que cargue .env aunque NODE_ENV sea 'production'
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        '.env',
        '.env.local',
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Certificado, Persona, DetalleParametro, Institucion, Modulo, Parametro, Plantilla, Programa],
        // autoLoadEntities: false,
        synchronize: false // Desactivar en producción
      })
    }),
    CertificadosModule,
    DetalleParametrosModule,
    InstitucionesModule,
    ModulosModule,
    ParametrosModule,
    PersonasModule,
    PlantillasModule,
    ProgramasModule
  ],
})
export class AppModule { }
