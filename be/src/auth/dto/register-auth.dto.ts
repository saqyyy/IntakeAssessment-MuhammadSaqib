import { IsEmail, MinLength, MaxLength, Matches, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/constants/role.enum';

export class RegistrationDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    role: Role;

}
