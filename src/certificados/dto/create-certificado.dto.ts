import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCertificadoDto {
    @IsNumber()
    @IsNotEmpty()
    id_persona: number

    @IsNumber()
    @IsNotEmpty()
    codigo_tipocertificado: number

    @IsNumber()
    @IsNotEmpty()
    id_sucursal: number

    @IsNumber()
    @IsNotEmpty()
    id_plantilla: number

    @IsNumber()
    @IsNotEmpty()
    id_programa: number

    @IsString()
    @IsNotEmpty()
    nombre_impresion: string

    @IsBoolean()
    @IsOptional()
    estado?: boolean
}