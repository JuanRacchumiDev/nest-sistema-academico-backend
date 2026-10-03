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
import { UpdateCertificadoDto } from './dto/update-certificado.dto.js';

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

        const { pathFile, filename, codigoQrPath } = certificado

        // Eliminar archivo PDF generado
        // if (certificado.pathFile && certificado.filename) {
        //     try {
        //         const fullPdfPath = path.resolve(
        //             process.cwd(),
        //             'storage',
        //             certificado.pathFile,
        //             certificado.filename,
        //         );

        //         if (fs.existsSync(fullPdfPath)) {
        //             fs.unlinkSync(fullPdfPath);
        //         }
        //     } catch (error) {
        //         console.error(`Error al eliminar el archivo PDF del certificado ${id}:`, error);
        //     }
        // }

        // // Eliminar imagen QR generado
        // if (certificado.codigoQrPath) {
        //     try {
        //         const fullQrPath = path.resolve(
        //             process.cwd(),
        //             'storage',
        //             certificado.codigoQrPath,
        //         );

        //         if (fs.existsSync(fullQrPath)) {
        //             fs.unlinkSync(fullQrPath);
        //         }
        //     } catch (error) {
        //         console.error(`Error al eliminar la imagen QR del certificado ${id}:`, error);
        //     }
        // }

        this.eliminarArchivosFisicos(pathFile, filename, codigoQrPath);

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

        const userCrea = user?.name || 'SYSTEM';
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

        return await this.generarArchivosYGuardar(certificadoGuardado.id);

        // Recargar Relaciones para obtener datos completos de programa y plantilla
        // const certificadoFull = await this.certificadoRepository.findOne({
        //     where: { id: certificadoGuardado.id },
        //     relations: {
        //         persona: true,
        //         tipoCertificado: true,
        //         programa: {
        //             tipoPrograma: true,
        //             modulos: true
        //         },
        //         plantilla: {
        //             institucion: true,
        //         },
        //         sucursal: true,
        //     },
        // });

        // if (!certificadoFull) {
        //     throw new NotFoundException('Error al recuperar información del certificado guardado');
        // }

        // // Construcción dinámica de la estructura de directorios:
        // const tipoCertificadoSlug = (certificadoFull.programa?.tipoPrograma?.nombreUrl || 'capacitacion')
        //     .toLowerCase()
        //     .trim()
        //     .normalize('NFD')
        //     .replace(/[\u0300-\u036f]/g, ''); // Remueve tildes y acentos

        // const esEspecializacion = tipoCertificadoSlug === 'especializacion';

        // let contenido: string | string[] | null = null;

        // if (esEspecializacion) {
        //     const modulos = certificadoFull.programa?.modulos || [];
        //     console.log({ modulos })
        //     contenido = modulos.map((m) => m.titulo)
        // } else {
        //     contenido = certificadoFull.programa?.temario || null
        // }

        // console.log({ esEspecializacion })
        // console.log({ contenido })

        // const anio = new Date().getFullYear().toString();

        // const sucursalSlug = (certificadoFull.sucursal?.nombre || 'innovaperu')
        //     .toLowerCase()
        //     .trim()
        //     .normalize('NFD')
        //     .replace(/[\u0300-\u036f]/g, '');

        // const dniAlumno = certificadoFull.persona?.numeroDocumento || '00000000';

        // // Ruta de carpeta relativa
        // const folderPath = path.join(tipoCertificadoSlug, anio, sucursalSlug, dniAlumno);
        // const fileName = `certificado_${codigoVerificacion}.pdf`;
        // const qrPath = path.join(folderPath, `qr_${codigoVerificacion}.png`);

        // // Actualizar rutas calculadas en el registro del certificado
        // certificadoFull.pathFile = folderPath;
        // certificadoFull.filename = fileName;
        // certificadoFull.codigoQrPath = qrPath;
        // await this.certificadoRepository.save(certificadoFull);

        // // URL pública y QR
        // const frontendUrl = this.configService.get<string>(
        //     'FRONTEND_URL',
        //     'https://app.innovaperu.edu.pe',
        // );
        // const qrUrl = `${frontendUrl.replace(/\/$/, '')}/validar-certificado/${codigoVerificacion}`;

        // const qrBase64 = await this.qrCodeService.generateAndSaveQR(qrUrl, qrPath);

        // // Resolver esquema de estilos (basado en tipoPrograma, tipo_disenio y disenio_default)
        // const tipoDisenio = certificadoFull.plantilla?.tipoDisenio;
        // const disenioDefault = certificadoFull.plantilla?.disenioDefault;

        // console.log({ tipoDisenio })
        // console.log({ disenioDefault })

        // const selectedStyles = resolvePdfStyle(disenioDefault, tipoDisenio);
        // console.log({ selectedStyles })

        // // Resolver texto de fechas y horas
        // const horas = certificadoFull.programa?.horasAcademicas || 120;
        // const fechasText = DateHelper.formatearRangoFechas(certificadoFull.programa?.fechaInicio, certificadoFull.programa?.fechaFinal)
        // const fechasHorasText = `${fechasText} con una duración de ${horas} horas`

        // // Logo institucional
        // const logoPath = certificadoFull.sucursal?.logoPath || certificadoFull.plantilla?.institucion?.logoPath;

        // // Compilar PDF
        // const relativePdfPath = path.join(folderPath, fileName);
        // await this.pdfGeneratorService.generarCertificadoPdf({
        //     nombreAlumno: certificadoFull.nombreImpresion,
        //     tituloPrograma: certificadoFull.programa?.titulo || 'PROGRAMA ACADÉMICO',
        //     fechasProgramaText: fechasHorasText,
        //     nombreDirector: certificadoFull.plantilla?.institucion?.nombreDirector,
        //     codigoVerificacion,
        //     qrBase64,
        //     pathPdfFondo: certificadoFull.plantilla?.pathPdfFondo,
        //     outputPath: relativePdfPath,
        //     temario: contenido,
        //     esEspecializacion,
        //     logoPath: logoPath ? path.resolve(process.cwd(), 'storage', logoPath) : null,
        //     styles: selectedStyles,
        //     disenioDefault
        // });

        // return certificadoFull;
    }

    /**
     * Actualiza las propiedades de un certificado existente
     * @param id 
     * @returns Promise<Certificado>
     */
    async update(
        id: number,
        updateCertificadoDto: UpdateCertificadoDto,
        user?: AuthenticatedUser,
    ): Promise<Certificado> {
        const certificado = await this.certificadoRepository.findOne({ where: { id } });

        if (!certificado) {
            throw new NotFoundException(`El certificado con ID ${id} no existe`);
        }

        // Actualizar datos de auditoría
        const userActualiza = user?.name || 'SYSTEM';
        const fechaActualiza = new Date().toISOString().substring(0, 10);

        // Mapeo de relaciones y campos editables
        if (updateCertificadoDto.id_persona) {
            certificado.persona = { id: updateCertificadoDto.id_persona } as any;
        }
        if (updateCertificadoDto.codigo_tipocertificado) {
            certificado.tipoCertificado = { codigo: updateCertificadoDto.codigo_tipocertificado } as any;
        }
        if (updateCertificadoDto.id_sucursal) {
            certificado.sucursal = { id: updateCertificadoDto.id_sucursal } as any;
        }
        if (updateCertificadoDto.id_plantilla) {
            certificado.plantilla = { id: updateCertificadoDto.id_plantilla } as any;
        }
        if (updateCertificadoDto.id_programa) {
            certificado.programa = { id: updateCertificadoDto.id_programa } as any;
        }
        if (updateCertificadoDto.nombre_impresion !== undefined) {
            certificado.nombreImpresion = updateCertificadoDto.nombre_impresion;
        }
        if (updateCertificadoDto.estado !== undefined) {
            certificado.estado = updateCertificadoDto.estado;
        }

        certificado.userActualiza = userActualiza;
        certificado.fechaActualiza = fechaActualiza;

        await this.certificadoRepository.save(certificado);

        // Regenerar el PDF manteniendo el código de verificación y QR existente
        return await this.generarArchivosYGuardar(id);
    }

    /**
     * Genera archivo PDF y código QR
     * @param id number
     * @returns Promise<Certificado>
     */
    private async generarArchivosYGuardar(id: number): Promise<Certificado> {
        const certificadoFull = await this.certificadoRepository.findOne({
            where: { id },
            relations: {
                persona: true,
                tipoCertificado: true,
                programa: {
                    tipoPrograma: true,
                    modulos: true,
                },
                plantilla: {
                    institucion: true,
                },
                sucursal: true,
            },
        });

        if (!certificadoFull) {
            throw new NotFoundException('Error al recuperar información del certificado');
        }

        const codigoVerificacion = certificadoFull.codigoVerificacion;

        // Construcción dinámica de la estructura de directorios
        const tipoCertificadoSlug = (certificadoFull.programa?.tipoPrograma?.nombreUrl || 'capacitacion')
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const esEspecializacion = tipoCertificadoSlug === 'especializacion';

        let contenido: string | string[] | null = null;
        if (esEspecializacion) {
            const modulos = certificadoFull.programa?.modulos || [];
            contenido = modulos.map((m) => m.titulo);
        } else {
            contenido = certificadoFull.programa?.temario || null;
        }

        const anio = new Date().getFullYear().toString();

        const sucursalSlug = (certificadoFull.sucursal?.nombre || 'innovaperu')
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const dniAlumno = certificadoFull.persona?.numeroDocumento || '00000000';

        // Rutas
        const folderPath = path.join(tipoCertificadoSlug, anio, sucursalSlug, dniAlumno);
        const fileName = `certificado_${codigoVerificacion}.pdf`;
        const qrPath = path.join(folderPath, `qr_${codigoVerificacion}.png`);

        // Si la ruta cambió (ej. cambió la persona o el programa), se borran los archivos previos
        if (
            (certificadoFull.pathFile && certificadoFull.pathFile !== folderPath) ||
            (certificadoFull.filename && certificadoFull.filename !== fileName)
        ) {
            this.eliminarArchivosFisicos(certificadoFull.pathFile, certificadoFull.filename, certificadoFull.codigoQrPath);
        }

        // Actualizar metadatos de archivos
        certificadoFull.pathFile = folderPath;
        certificadoFull.filename = fileName;
        certificadoFull.codigoQrPath = qrPath;

        await this.certificadoRepository.save(certificadoFull);

        // URL pública y QR (Se mantiene la misma URL y código de verificación)
        const frontendUrl = this.configService.get<string>(
            'FRONTEND_URL',
            'https://app.innovaperu.edu.pe',
        );
        const qrUrl = `${frontendUrl.replace(/\/$/, '')}/validar-certificado/${codigoVerificacion}`;

        // Generar o sobrescribir la imagen QR
        const qrBase64 = await this.qrCodeService.generateAndSaveQR(qrUrl, qrPath);

        // Estilos
        const tipoDisenio = certificadoFull.plantilla?.tipoDisenio;
        const disenioDefault = certificadoFull.plantilla?.disenioDefault;
        const selectedStyles = resolvePdfStyle(disenioDefault, tipoDisenio);

        // Fechas y Horas
        const horas = certificadoFull.programa?.horasAcademicas || 120;
        const fechasText = DateHelper.formatearRangoFechas(
            certificadoFull.programa?.fechaInicio,
            certificadoFull.programa?.fechaFinal,
        );
        const fechasHorasText = `${fechasText} con una duración de ${horas} horas`;

        // Logo
        const logoPath = certificadoFull.sucursal?.logoPath || certificadoFull.plantilla?.institucion?.logoPath;

        // Compilar/Sobrescribir el PDF
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
            temario: contenido,
            esEspecializacion,
            logoPath: logoPath ? path.resolve(process.cwd(), 'storage', logoPath) : null,
            styles: selectedStyles,
            disenioDefault,
        });

        return certificadoFull;
    }

    /**
     * Helper para limpiar archivos físicos del almacenamiento
     */
    private eliminarArchivosFisicos(pathFile?: string, filename?: string, qrPath?: string) {
        if (pathFile && filename) {
            try {
                const fullPdfPath = path.resolve(process.cwd(), 'storage', pathFile, filename);
                if (fs.existsSync(fullPdfPath)) {
                    fs.unlinkSync(fullPdfPath);
                }
            } catch (error) {
                console.error(`Error al eliminar PDF anterior:`, error);
            }
        }

        if (qrPath) {
            try {
                const fullQrPath = path.resolve(process.cwd(), 'storage', qrPath);
                if (fs.existsSync(fullQrPath)) {
                    fs.unlinkSync(fullQrPath);
                }
            } catch (error) {
                console.error(`Error al eliminar QR anterior:`, error);
            }
        }
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
        const style = resolvePdfStyle(disenioDefault, tipoDisenio, subtipoDisenio);
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