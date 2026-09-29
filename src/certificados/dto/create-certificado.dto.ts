import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

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

    @IsOptional()
    @IsString()
    @MaxLength(12)
    user_crea?: string

    @IsOptional()
    @IsString()
    @MaxLength(12)
    user_actualiza?: string

    @IsOptional()
    @IsString()
    @MaxLength(12)
    user_elimina?: string

    @IsOptional()
    @IsString()
    @MaxLength(10)
    fecha_crea?: string

    @IsOptional()
    @IsString()
    @MaxLength(10)
    fecha_actualiza?: string

    @IsOptional()
    @IsString()
    @MaxLength(10)
    fecha_elimina?: string

    @IsBoolean()
    @IsOptional()
    estado?: boolean
}