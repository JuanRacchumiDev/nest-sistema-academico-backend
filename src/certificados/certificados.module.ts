import { Module } from '@nestjs/common';
import { CertificadosController } from './certificados.controller.js';
import { CertificadosService } from './certificados.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity.js';
import { Persona } from '../personas/entities/persona.entity.js';
import { Institucion } from '../instituciones/entities/institucion.entity.js';
import { Plantilla } from '../plantillas/entities/plantilla.entity.js';
import { Programa } from '../programas/entities/programa.entity.js';
import { Modulo } from '../modulos/entities/modulo.entity.js';
import { DetalleParametro } from '../detalle-parametros/entities/detalle-parametro.entity.js';
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service.js';
import { QrCodeService } from '../common/services/qr-code.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Certificado,
      Persona,
      Institucion,
      Plantilla,
      Programa,
      Modulo,
      DetalleParametro
    ])
  ],
  controllers: [CertificadosController],
  providers: [
    CertificadosService,
    PdfGeneratorService,
    QrCodeService
  ],
  exports: [CertificadosService]
})
export class CertificadosModule { }
