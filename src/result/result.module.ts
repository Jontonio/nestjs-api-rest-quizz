import { Module, RequestMethod } from "@nestjs/common";
import { ResultService } from "./result.service";
import { ResultController } from "./result.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Result } from "./entities/result.entity";
import { MiddlewareBuilder } from "@nestjs/core";
import { ExistResult } from "src/middlewares/exist-result.middleware";
import { IdReportValidator } from "src/decorators/IdReport";
import { Report } from "src/report/entities/report.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Result, Report])],
  controllers: [ResultController],
  providers: [ResultService, IdReportValidator],
})
export class ResultModule {
  configure(consumer: MiddlewareBuilder) {
    consumer
      .apply(ExistResult)
      .forRoutes(
        { path: "result/:id", method: RequestMethod.PATCH },
        { path: "result/:id", method: RequestMethod.GET },
        { path: "result/:id", method: RequestMethod.DELETE },
      );
  }
}
