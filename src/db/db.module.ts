import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
