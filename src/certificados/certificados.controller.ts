import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, StreamableFile } from '@nestjs/common';
import { CertificadosService } from './certificados.service.js';
import { Certificado } from './entities/certificado.entity.js';
import { CreateCertificadoDto } from './dto/create-certificado.dto.js';

@Controller('certificados')
export class CertificadosController {
    constructor(private readonly certificadosService: CertificadosService) { }

    @Post()
    async create(@Body() createCertificadoDto: CreateCertificadoDto): Promise<Certificado> {
        return await this.certificadosService.create(createCertificadoDto)
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Certificado> {
        return await this.certificadosService.findOneById(id)
    }

    @Get(':id/pdf')
    async descargarPdf(
        @Param('id', ParseIntPipe) id: number
    ): Promise<StreamableFile> {
        const { stream, filename } = await this.certificadosService.getPdfStream(id);

        return new StreamableFile(stream, {
            type: 'application/pdf',
            disposition: `attachment; filename="${filename}"`
        })
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.certificadosService.remove(id)
    }
}
