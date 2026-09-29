import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { CertificadosService } from './certificados.service.js';
import { Certificado } from './entities/certificado.entity.js';
import { CreateCertificadoDto } from './dto/create-certificado.dto.js';
import { currentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../common/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('certificados')
@UseGuards(JwtAuthGuard)
export class CertificadosController {
    constructor(private readonly certificadosService: CertificadosService) { }

    @Get('resolver-estilo')
    resolverEstilo(
        @currentUser() user: AuthenticatedUser,
        @Query('disenioDefault') disenioDefault?: string,
        @Query('tipoDisenio') tipoDisenio?: string,
        @Query('subtipoDisenio') subtipoDisenio?: string,
    ) {
        return this.certificadosService.obtenerConfiguracionCertificado(
            user,
            disenioDefault,
            tipoDisenio,
            subtipoDisenio,
        );
    }

    @Post()
    async create(
        @Body() createCertificadoDto: CreateCertificadoDto,
        @currentUser() user: AuthenticatedUser
    ): Promise<Certificado> {
        // createCertificadoDto.user_crea = user.name
        // createCertificadoDto.fecha_crea = new Date().toISOString().substring(0, 10);
        console.log('---- user AuthenticateUser ----')
        console.log({ user })
        return await this.certificadosService.create(createCertificadoDto, user)
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Certificado> {
        return await this.certificadosService.findOneById(id)
    }

    @Get('validar/:codigo')
    async validarByCodigo(
        @Param('codigo') codigo: string
    ): Promise<Certificado> {
        return await this.certificadosService.findOneByCodigo(codigo);
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

    @Get('descargar/:codigo')
    async descargarPdfByCodigo(
        @Param('codigo') codigo: string
    ): Promise<StreamableFile> {
        const { stream, filename } = await this.certificadosService.getPdfStreamByCodigo(codigo);

        return new StreamableFile(stream, {
            type: 'application/pdf',
            disposition: `attachment; filename="${filename}"`
        });
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.certificadosService.remove(id)
    }
}
