import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeStaffModule } from "./type-staff/type-staff.module";
import { DbModule } from "./db/db.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule, DbModule, TypeStaffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
