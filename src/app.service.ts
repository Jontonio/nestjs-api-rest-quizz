import { Injectable } from "@nestjs/common";
import { HttpResponse } from "./class/HttpResponse";

@Injectable()
export class AppService {
  getHello() {
    return new HttpResponse().success(200, "Welcome to SOFTWARE X");
  }
}
