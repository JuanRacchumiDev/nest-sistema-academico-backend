import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificadoDto } from './create-certificado.dto.js';

export class UpdateCertificadoDto extends PartialType(CreateCertificadoDto) { }