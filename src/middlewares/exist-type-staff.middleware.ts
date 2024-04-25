import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class ExistTypeStaffMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log("Por aqui paso");
    next();
  }
}
