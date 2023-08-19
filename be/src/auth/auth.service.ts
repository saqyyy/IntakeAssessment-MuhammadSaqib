import { HttpException, Injectable } from '@nestjs/common';
import { RegistrationDTO } from './dto/register-auth.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PasswordUtils } from './utils/password-utils';
import { LoginDTO } from './dto/login-auth-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersRepository.findOne({where: {email}});

    if (user) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDTO) {
    const { email, password } = loginDto;
    const userFound = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .addSelect('user.password')
      .getOne();

    if (!userFound)
      throw new HttpException('Invalid username or password', 403);

    const passwordCheck = await PasswordUtils.comparePasswords(
      password,
      userFound.password,
    );

    if (!passwordCheck) throw new HttpException('Invalid username or password', 403);

    const { password: pass, ...user } = userFound;

    return {
      data: {
        ...user,
        accessToken: this.jwtService.sign(user),
      },
      message: 'You Have Logged In Successfully',
    };
  }

  async register(createAuthDto: RegistrationDTO) {
    const { email } = createAuthDto;

    //checks for phone & email
    const emailExist = await this.usersRepository.count({where: {email}})

    if (emailExist) throw new HttpException('Email address already taken', 400);;

      const userSaveInitiate = this.usersRepository.create(createAuthDto);
      this.usersRepository.save(userSaveInitiate);

      return {
        message:
          'Thank you for signing up',
      };
  }


  async getProfile(user: any) {
    const data = user;
    return {
      data,
    };
  }

}
