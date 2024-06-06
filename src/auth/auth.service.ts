import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { HttpResponse } from "src/class/HttpResponse";
import { comparePassword } from "src/helpers/HashPassword";
import { generateToken } from "src/helpers/JWT";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    public userModel: Repository<User>,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    try {
      const { email, password } = createAuthDto;
      //Verify if exists user
      const user = await this.userModel.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException("Email y/o password son incorrectos");
      }
      //Verify the enable user
      if (!user.status) {
        throw new UnauthorizedException("Email y/o password son incorrectos");
      }
      //Verify the enable user
      if (!user.is_active) {
        throw new UnauthorizedException(
          "Usuario inhabilitado, comuniquese con el administrador",
        );
      }
      //Verify the password
      if (!comparePassword(password, user.password)) {
        throw new UnauthorizedException("Email y/o password son incorrectos");
      }
      //Generate token
      const payload = {
        email: user.email,
      };

      const token = generateToken(payload);
      // Generate payload user
      return new HttpResponse().success(200, "Bienvenid@ al sistema", token);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, e.status);
    }
  }
}
