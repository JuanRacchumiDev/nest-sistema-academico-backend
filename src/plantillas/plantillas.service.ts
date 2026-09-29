import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity.js';
import { Repository } from 'typeorm';
import { CreatePlantillaDto } from './dto/create-planilla.dto.js';
import { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';

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
        files: PlantillaFiles,
        user?: AuthenticatedUser
    ): Promise<Plantilla> {
        console.log('---- user in create CertificadosService ----')
        console.log({ user })

        const userCrea = user?.name || user?.id || 'SYSTEM';
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
            ...(dto.codigo_tipoprograma && { tipoPrograma: { codigo: dto.codigo_tipoprograma } })
        }

        const nuevaPlantilla = this.plantillaRepository.create(nuevaPlantillaData)

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
