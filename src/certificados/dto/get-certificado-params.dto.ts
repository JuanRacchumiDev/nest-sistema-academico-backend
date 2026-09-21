import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class GetCertificadoParamsDto {
    @Type(() => Number)
    @IsInt({ message: 'El id debe ser un número entero' })
    @IsPositive({ message: 'El id debe ser mayor a cero' })
    id: number
}