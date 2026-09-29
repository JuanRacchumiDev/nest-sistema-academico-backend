import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
    sub: string | number; // ID del usuario proveniente de Laravel
    name?: string;       // Presente solo si se configuró getJWTCustomClaims()
    email?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'tu_secreto_super_seguro',
        });
    }

    async validate(payload: JwtPayload) {
        console.log('---- payload validate ----')
        console.log({ payload })

        if (!payload || payload.sub === undefined) {
            throw new UnauthorizedException('Token no válido o payload incompleto.');
        }

        return {
            id: String(payload.sub),
            // Si Laravel envía name en los custom claims, se usa ese; si no, se usa el ID o username por defecto
            name: payload.name || `USER_${payload.sub}`,
            email: payload.email || null,
        };
    }
}