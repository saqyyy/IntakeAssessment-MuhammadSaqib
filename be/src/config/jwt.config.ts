import { registerAs } from '@nestjs/config'


export default registerAs('JWT', () => ({
    JWT_AUTH: process.env.JWT_AUTH,
    JWT_TIMEOUT: process.env.JWT_TIMEOUT,
}));