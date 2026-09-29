import { Module } from '@nestjs/common';
import { PlantillasService } from './plantillas.service.js';
import { PlantillasController } from './plantillas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plantilla } from './entities/plantilla.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Plantilla])],
    providers: [PlantillasService],
    controllers: [PlantillasController],
    exports: [PlantillasService]
})
export class PlantillasModule { }
