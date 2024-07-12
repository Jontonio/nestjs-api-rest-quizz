import { Module, RequestMethod } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { MiddlewareBuilder } from "@nestjs/core";
import { VerifyJwtMiddleware } from "src/middlewares/verify-jwt.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareBuilder) {
    consumer.apply(VerifyJwtMiddleware).forRoutes({
      path: "auth/check-session",
      method: RequestMethod.GET,
    });
  }
}
