import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

import { Certificado } from './entities/certificado.entity.js';
import { CreateCertificadoDto } from './dto/create-certificado.dto.js';
import { QrCodeService } from '../common/services/qr-code.service.js';
import { PdfGeneratorService } from './pdf-generator/pdf-generator.service.js';
import { resolvePdfStyle, CertificadoRenderData } from './config/pdf-styles.config.js'
import { DateHelper } from '../common/helpers/date.helper.js'
import { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
import { DateFormatterUtil } from '../common/utils/date-formatter.util.js';

@Injectable()
export class CertificadosService {
    constructor(
        @InjectRepository(Certificado)
        private readonly certificadoRepository: Repository<Certificado>,
        private readonly qrCodeService: QrCodeService,
        private readonly pdfGeneratorService: PdfGeneratorService,
        private readonly configService: ConfigService,
    ) { }

    /**
     * Elimina el registro del certificado
     */
    async remove(id: number): Promise<{ message: string; id: number }> {
        const certificado = await this.certificadoRepository.findOne({
            where: { id }
        })

        if (!certificado) {
            throw new NotFoundException(`El certificado con ID ${id} no existe`)
        }

        // Eliminar archivo PDF generado
        if (certificado.pathFile && certificado.filename) {
            try {
                const fullPdfPath = path.resolve(
                    process.cwd(),
                    'storage',
                    certificado.pathFile,
                    certificado.filename,
                );

                if (fs.existsSync(fullPdfPath)) {
                    fs.unlinkSync(fullPdfPath);
                }
            } catch (error) {
                console.error(`Error al eliminar el archivo PDF del certificado ${id}:`, error);
            }
        }

        // Eliminar imagen QR generado
        if (certificado.codigoQrPath) {
            try {
                const fullQrPath = path.resolve(
                    process.cwd(),
                    'storage',
                    certificado.codigoQrPath,
                );

                if (fs.existsSync(fullQrPath)) {
                    fs.unlinkSync(fullQrPath);
                }
            } catch (error) {
                console.error(`Error al eliminar la imagen QR del certificado ${id}:`, error);
            }
        }

        // Eliminar el registro de la base de datos
        await this.certificadoRepository.remove(certificado)

        return {
            message: `Certificado #${id} y sus archivos asociados fueron eliminados correctamente`,
            id,
        };
    }

    /**
     * Registra un certificado y genera su correspondiente PDF y QR
     */
    async create(createCertificadoDto: CreateCertificadoDto, user?: AuthenticatedUser): Promise<Certificado> {
        console.log('---- user in create CertificadosService ----')
        console.log({ user })

        const userCrea = user?.name || user?.id || 'SYSTEM';
        const fechaCrea = new Date().toISOString().substring(0, 10);

        // Generar código de verificación único
        const codigoVerificacion = randomUUID().replace(/-/g, '').substring(0, 12).toUpperCase();

        const nuevoCertificadoData = {
            persona: { id: createCertificadoDto.id_persona },
            tipoCertificado: { codigo: createCertificadoDto.codigo_tipocertificado },
            sucursal: { id: createCertificadoDto.id_sucursal },
            plantilla: { id: createCertificadoDto.id_plantilla },
            programa: { id: createCertificadoDto.id_programa },
            nombreImpresion: createCertificadoDto.nombre_impresion,
            estado: createCertificadoDto.estado ?? true,
            codigoVerificacion,
            codigoQrPath: '',
            pathFile: '',
            filename: '',
            userCrea,
            fechaCrea
        }

        console.log({ nuevoCertificadoData })

        // Crear Instancia y Guardar en la Base de Datos
        const certificado = this.certificadoRepository.create(nuevoCertificadoData);

        const certificadoGuardado = await this.certificadoRepository.save(certificado);

        // Recargar Relaciones para obtener datos completos de programa y plantilla
        const certificadoFull = await this.certificadoRepository.findOne({
            where: { id: certificadoGuardado.id },
            relations: {
                persona: true,
                tipoCertificado: true,
                programa: {
                    tipoPrograma: true,
                },
                plantilla: {
                    institucion: true,
                },
                sucursal: true,
            },
        });

        if (!certificadoFull) {
            throw new NotFoundException('Error al recuperar información del certificado guardado');
        }

        // Construcción dinámica de la estructura de directorios:
        const tipoCertificadoSlug = (certificadoFull.programa?.tipoPrograma?.nombreUrl || 'capacitacion')
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // Remueve tildes y acentos

        const anio = new Date().getFullYear().toString();

        const sucursalSlug = (certificadoFull.sucursal?.nombre || 'innovaperu')
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const dniAlumno = certificadoFull.persona?.numeroDocumento || '00000000';

        // Ruta de carpeta relativa
        const folderPath = path.join(tipoCertificadoSlug, anio, sucursalSlug, dniAlumno);
        const fileName = `certificado_${codigoVerificacion}.pdf`;
        const qrPath = path.join(folderPath, `qr_${codigoVerificacion}.png`);

        // Actualizar rutas calculadas en el registro del certificado
        certificadoFull.pathFile = folderPath;
        certificadoFull.filename = fileName;
        certificadoFull.codigoQrPath = qrPath;
        await this.certificadoRepository.save(certificadoFull);

        // URL pública y QR
        const frontendUrl = this.configService.get<string>(
            'FRONTEND_URL',
            'https://app.innovaperu.edu.pe',
        );
        const qrUrl = `${frontendUrl.replace(/\/$/, '')}/validar-certificado/${codigoVerificacion}`;

        const qrBase64 = await this.qrCodeService.generateAndSaveQR(qrUrl, qrPath);

        // Resolver esquema de estilos (basado en tipoPrograma, tipo_disenio y disenio_default)
        const tipoDisenio = certificadoFull.plantilla?.tipoDisenio;
        const disenioDefault = certificadoFull.plantilla?.disenioDefault;

        console.log({ tipoDisenio })
        console.log({ disenioDefault })

        const selectedStyles = resolvePdfStyle(disenioDefault, tipoDisenio);
        console.log({ selectedStyles })

        // Resolver texto de fechas y horas
        const horas = certificadoFull.programa?.horasAcademicas || 120;
        const fechasText = DateHelper.formatearRangoFechas(certificadoFull.programa?.fechaInicio, certificadoFull.programa?.fechaFinal)
        const fechasHorasText = `${fechasText} con una duración de ${horas} horas`

        // Logo institucional
        const logoPath = certificadoFull.sucursal?.logoPath || certificadoFull.plantilla?.institucion?.logoPath;

        // Compilar PDF
        const relativePdfPath = path.join(folderPath, fileName);
        await this.pdfGeneratorService.generarCertificadoPdf({
            nombreAlumno: certificadoFull.nombreImpresion,
            tituloPrograma: certificadoFull.programa?.titulo || 'PROGRAMA ACADÉMICO',
            fechasProgramaText: fechasHorasText,
            nombreDirector: certificadoFull.plantilla?.institucion?.nombreDirector,
            codigoVerificacion,
            qrBase64,
            pathPdfFondo: certificadoFull.plantilla?.pathPdfFondo,
            outputPath: relativePdfPath,
            temario: certificadoFull.programa?.temario || null,
            logoPath: logoPath ? path.resolve(process.cwd(), 'storage', logoPath) : null,
            styles: selectedStyles,
            disenioDefault
        });

        return certificadoFull;
    }

    async findOneById(id: number): Promise<Certificado> {
        const certificado = await this.certificadoRepository.findOne({
            where: { id, estado: true },
            relations: {
                persona: true,
                tipoCertificado: true,
                sucursal: true,
                plantilla: true,
                programa: true,
                modulo: true,
            },
        });

        if (!certificado) {
            throw new NotFoundException(`Certificado con ID ${id} no encontrado`);
        }

        return certificado;
    }

    async findOneByCodigo(codigo: string): Promise<Certificado> {
        const certificado = await this.certificadoRepository.findOne({
            where: { codigoVerificacion: codigo, estado: true },
            relations: {
                persona: true,
                tipoCertificado: true,
                sucursal: true,
                plantilla: true,
                programa: true,
                modulo: true,
            },
        });

        if (!certificado) {
            throw new NotFoundException(`Certificado con código ${codigo} no fue encontrado`);
        }

        return certificado;
    }

    /**
     * Retorna el Stream/Buffer del PDF para su descarga
     */
    async getPdfStream(id: number): Promise<{ stream: fs.ReadStream; filename: string }> {
        const certificado = await this.findOneById(id)

        const fullPdfPath = path.resolve(
            process.cwd(),
            'storage',
            certificado.pathFile || '',
            certificado.filename || ''
        );

        if (!fs.existsSync(fullPdfPath)) {
            throw new NotFoundException('El archivo PDF del certificado no fue encontrado en el servidor');
        }

        const stream = fs.createReadStream(fullPdfPath);
        const downloadName = `certificado_${certificado.id}_${certificado.codigoVerificacion}.pdf`;

        return { stream, filename: downloadName };
    }

    /**
     * Retorna el Stream/Buffer del PDF para descarga buscando por CÓDIGO DE VERIFICACIÓN
     */
    async getPdfStreamByCodigo(codigo: string): Promise<{ stream: fs.ReadStream; filename: string }> {
        const certificado = await this.findOneByCodigo(codigo);

        const fullPdfPath = path.resolve(
            process.cwd(),
            'storage',
            certificado.pathFile || '',
            certificado.filename || ''
        );

        if (!fs.existsSync(fullPdfPath)) {
            throw new NotFoundException(`El archivo PDF con código ${codigo} no fue encontrado físicamente en el directorio`);
        }

        const stream = fs.createReadStream(fullPdfPath);
        const downloadName = `certificado_${certificado.codigoVerificacion}.pdf`;

        return { stream, filename: downloadName };
    }

    obtenerConfiguracionCertificado(
        user: AuthenticatedUser,
        disenioDefault?: string,
        tipoDisenio?: string,
        subtipoDisenio?: string,
    ): CertificadoRenderData {
        // Resolver el estilo visual del PDF
        const style = resolvePdfStyle(disenioDefault, tipoDisenio, subtipoDisenio);

        // Generar metadatos de fechas en formato yyyy-MM-dd y auditoría de usuario
        const fechaActual = DateFormatterUtil.formatDate();

        return {
            style,
            metadata: {
                fecha_crea: fechaActual,
                fecha_actualiza: fechaActual,
                user_crea: user.id,
                user_actualiza: user.id,
            },
        };
    }
}