import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PlantillasService } from './plantillas.service.js';
import type { PlantillaFiles } from './plantillas.service.js';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerPlantillasOptions } from './config/multer-plantillas.config.js';
import { CreatePlantillaDto } from './dto/create-plantilla.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { currentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
import { Plantilla } from './entities/plantilla.entity.js';
import { UpdatePlantillaDto } from './dto/update-plantilla.dto.js';

@Controller('plantillas')
@UseGuards(JwtAuthGuard)
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
        @currentUser() user: AuthenticatedUser
    ): Promise<Plantilla> {
        return await this.plantillasService.create(createPlantillaDto, files, user)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.plantillasService.findOneById(id)
    }

    @Patch(':id')
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
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePlantillaDto: UpdatePlantillaDto,
        @UploadedFiles() files: PlantillaFiles,
        @currentUser() user: AuthenticatedUser
    ): Promise<Plantilla> {
        return await this.plantillasService.update(id, updatePlantillaDto, files, user)
    }
}
