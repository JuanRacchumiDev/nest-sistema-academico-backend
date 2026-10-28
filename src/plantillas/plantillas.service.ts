import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity.js';
import { Repository } from 'typeorm';
import { CreatePlantillaDto } from './dto/create-plantilla.dto.js';
import { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto.js';
import * as fs from 'fs';
import * as path from 'path';

export interface PlantillaTemp {
    plantilla: Plantilla,
    hasImagenFondo?: boolean
    hasImagenPublica?: boolean
    hasPdfFondo?: boolean
}

export interface PlantillaFiles {
    path_imagen_fondo?: Express.Multer.File[]
    path_imagen_publica?: Express.Multer.File[]
    path_pdf_fondo?: Express.Multer.File[]
}

@Injectable()
export class PlantillasService {
    constructor(
        @InjectRepository(Plantilla)
        private readonly plantillaRepository: Repository<Plantilla>
    ) { }

    async update(
        id: number,
        dto: UpdatePlantillaDto,
        files?: PlantillaFiles,
        user?: AuthenticatedUser
    ): Promise<Plantilla> {
        // Verifica si la plantilla existe
        const plantillaTemp = await this.findOneById(id)
        const plantilla = plantillaTemp.plantilla

        const userActualiza = user?.name || 'SYSTEM'
        const fechaActualiza = new Date().toISOString().substring(0, 10)
        const relativeStoragePath = 'plantillas';

        // Procesar nuevas rutas de archivos solo si fueron provistos
        const pathImagenFondo = files?.path_imagen_fondo?.[0]
            ? `${relativeStoragePath}/${files.path_imagen_fondo[0].filename}`
            : undefined

        const pathImagenPublica = files?.path_imagen_publica?.[0]
            ? `${relativeStoragePath}/${files.path_imagen_publica[0].filename}`
            : undefined

        const pathPdfFondo = files?.path_pdf_fondo?.[0]
            ? `${relativeStoragePath}/${files.path_pdf_fondo[0].filename}`
            : undefined

        // Fusionar datos actualizados
        this.plantillaRepository.merge(plantilla, {
            ...(dto.nombre && { nombre: dto.nombre }),
            ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
            ...(dto.tipo_disenio !== undefined && { tipoDisenio: dto.tipo_disenio }),
            ...(dto.disenio_default !== undefined && { disenioDefault: dto.disenio_default }),
            ...(dto.estado !== undefined && { estado: dto.estado }),
            ...(pathImagenFondo && { pathImagenFondo }),
            ...(pathImagenPublica && { pathImagenPublica }),
            ...(pathPdfFondo && { pathPdfFondo }),
            userActualiza,
            fechaActualiza,
            ...(dto.id_institucion !== undefined && {
                institucion: dto.id_institucion ? { id: dto.id_institucion } as any : null
            }),
            ...(dto.id_sucursal !== undefined && {
                sucursal: dto.id_sucursal ? { id: dto.id_sucursal } as any : null
            }),
            ...(dto.codigo_tipoprograma !== undefined && {
                tipoPrograma: dto.codigo_tipoprograma ? { codigo: dto.codigo_tipoprograma } as any : null
            })
        })

        // Guardar los cambios
        return await this.plantillaRepository.save(plantilla)
    }

    async create(
        dto: CreatePlantillaDto,
        files: PlantillaFiles,
        user?: AuthenticatedUser
    ): Promise<Plantilla> {
        console.log('---- user in create CertificadosService ----')
        console.log({ user })

        const userCrea = user?.name || 'SYSTEM';
        const fechaCrea = new Date().toISOString().substring(0, 10);

        const relativeStoragePath = 'plantillas'

        const pathImagenFondo = files?.path_imagen_fondo?.[0]
            ? `${relativeStoragePath}/${files.path_imagen_fondo[0].filename}`
            : undefined

        const pathImagenPublica = files?.path_imagen_publica?.[0]
            ? `${relativeStoragePath}/${files.path_imagen_publica[0].filename}`
            : undefined

        const pathPdfFondo = files?.path_pdf_fondo?.[0]
            ? `${relativeStoragePath}/${files.path_pdf_fondo[0].filename}`
            : undefined

        const nuevaPlantillaData = {
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            tipoDisenio: dto.tipo_disenio,
            disenioDefault: dto.disenio_default,
            estado: dto.estado ?? true,
            pathImagenFondo,
            pathImagenPublica,
            pathPdfFondo,
            userCrea,
            fechaCrea,
            ...(dto.id_institucion && { institucion: { id: dto.id_institucion } }),
            ...(dto.id_sucursal && { sucursal: { id: dto.id_sucursal } }),
            ...(dto.codigo_tipoprograma && { tipoPrograma: { codigo: dto.codigo_tipoprograma } })
        }

        const nuevaPlantilla = this.plantillaRepository.create(nuevaPlantillaData)

        return await this.plantillaRepository.save(nuevaPlantilla)
    }

    async findOneById(id: number): Promise<PlantillaTemp> {
        const plantilla = await this.plantillaRepository.findOne({
            where: { id, estado: true },

            relations: {
                institucion: true,
                sucursal: true,
                tipoPrograma: true
            }
        })

        if (!plantilla) {
            throw new NotFoundException(`Plantilla con ID ${id} no encontrada`);
        }

        const storageRoot = path.resolve(process.cwd(), 'storage');

        // Verificar si el archivo existe físicamente en el disco
        const hasImagenFondo = !!plantilla.pathImagenFondo && fs.existsSync(path.join(storageRoot, plantilla.pathImagenFondo));
        const hasImagenPublica = !!plantilla.pathImagenPublica && fs.existsSync(path.join(storageRoot, plantilla.pathImagenPublica));
        const hasPdfFondo = !!plantilla.pathPdfFondo && fs.existsSync(path.join(storageRoot, plantilla.pathPdfFondo));

        return {
            plantilla,
            hasImagenFondo,
            hasImagenPublica,
            hasPdfFondo
        }
    }
}
