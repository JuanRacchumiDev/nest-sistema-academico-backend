import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PlantillasService } from './plantillas.service.js';
import type { PlantillaFiles } from './plantillas.service.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerPlantillasOptions } from './config/multer-plantillas.config.js';
import { CreatePlantillaDto } from './dto/create-planilla.dto.js';

@Controller('plantillas')
export class PlantillasController {
    constructor(private readonly plantillasService: PlantillasService) { }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'path_imagen_fondo', maxCount: 1 },
                { name: 'path_imagen_publica', maxCount: 1 },
                { name: 'path_pdf_fondo', maxCount: 1 }
            ],
            multerPlantillasOptions
        )
    )
    async create(
        @Body() createPlantillaDto: CreatePlantillaDto,
        @UploadedFiles() files: PlantillaFiles,
    ) {
        return await this.plantillasService.create(createPlantillaDto, files)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.plantillasService.findOneById(id)
    }
}
