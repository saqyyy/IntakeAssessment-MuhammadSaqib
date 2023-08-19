import { ConfigService } from "@nestjs/config";

export const jwtFactory = {
    useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT.JWT_AUTH'),
        signOptions: {
            expiresIn: `${configService.get('JWT.JWT_TIMEOUT')}d`,
        },
    }),
    inject: [ConfigService],
};
