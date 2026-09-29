import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Ejecuta la lógica por defecto de Passport (extraer y validar token vía JwtStrategy)
        return super.canActivate(context);
    }

    /**
     * Personaliza la respuesta en caso de token inválido, expirado o ausente.
     */
    handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
        if (err || !user) {
            const mensajeError = info?.message === 'No auth token'
                ? 'No se proporcionó un token Bearer en el encabezado Authorization.'
                : info?.message || 'Acceso no autorizado.';

            throw err || new UnauthorizedException(mensajeError);
        }

        return user;
    }
}