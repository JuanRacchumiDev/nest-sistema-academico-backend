import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity.js';
import { Repository } from 'typeorm';
import { CreatePlantillaDto } from './dto/create-planilla.dto.js';

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

    async create(
        dto: CreatePlantillaDto,
        files: PlantillaFiles
    ): Promise<Plantilla> {
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

        const nuevaPlantilla = this.plantillaRepository.create({
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            tipoDisenio: dto.tipo_disenio,
            disenioDefault: dto.disenio_default,
            userCrea: dto.user_crea,
            estado: dto.estado ?? true,
            pathImagenFondo,
            pathImagenPublica,
            pathPdfFondo,
            ...(dto.id_institucion && { institucion: { id: dto.id_institucion } }),
            ...(dto.codigo_tipoprograma && { tipoPrograma: { codigo: dto.codigo_tipoprograma } })
        })

        return await this.plantillaRepository.save(nuevaPlantilla)
    }

    async findOneById(id: number): Promise<Plantilla> {
        const plantilla = await this.plantillaRepository.findOne({
            where: { id, estado: true },
            relations: {
                institucion: true,
                tipoPrograma: true
            }
        })

        if (!plantilla) {
            throw new NotFoundException(`Plantilla con ID ${id} no encontrada`);
        }

        return plantilla
    }
}
