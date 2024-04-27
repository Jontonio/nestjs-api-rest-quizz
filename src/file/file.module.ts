import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";
import { OpenIaService } from "src/open-ia/open-ia.service";

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService, OpenIaService],
})
export class FileModule {}
