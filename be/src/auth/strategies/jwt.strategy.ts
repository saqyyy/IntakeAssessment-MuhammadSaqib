import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService, private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT.JWT_AUTH')
        });
    }


    async validate(payload: any) {
        const user = await this.authService.validateUser(payload.email);
        if (!user) {
            throw new HttpException("Unauthorized", 401);
        }
        return user;
    }

}
