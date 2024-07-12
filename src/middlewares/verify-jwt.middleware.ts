import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { compareToken } from "src/helpers/JWT";

@Injectable()
export class VerifyJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    try {
      const token = req.headers.authorization;
      // const token = authHeader && authHeader.split(" ")[1];
      compareToken(token);
      //Todo: falta agregar usuario a la peticiones
      next();
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException(e.message);
    }
  }
}
