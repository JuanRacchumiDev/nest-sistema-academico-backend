import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePlantillaDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string

    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : null))
    @IsNumber()
    id_institucion?: number

    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : null))
    codigo_tipoprograma: number

    @IsOptional()
    @IsString()
    @MaxLength(150)
    descripcion?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    tipo_disenio?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    disenio_default: string

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
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    estado?: boolean = true
}