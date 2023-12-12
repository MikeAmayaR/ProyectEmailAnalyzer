import { Module } from '@nestjs/common';
import { ProfileUserController } from './controller/user.client.controller';
import { ProfileUserClientService } from './service/user.client.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './database/schema.db';
import { DatabaseModule } from './database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
        };
      },
    }),
  ],
  controllers: [ProfileUserController],
  providers: [ProfileUserClientService],
  exports: [ProfileUserClientService],
})
export class ParkitModuleModule {}
