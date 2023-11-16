import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async (configService:ConfigService)=>({
        type:configService.get<TypeOrmModuleOptions>('database.type',{
          infer:true,
        }),
        port:parseInt(configService.get<string>('database.port')),
        host:configService.get<string>('database.host'),
        username:configService.get<string>('database.username'),
        password:configService.get<string>('database.password'),
        database:configService.get<string>('database.name'),
        entities:[__dirname+'/**/*.entity{.ts,.js}'],
        synchronize:true
      }),
      inject:[ConfigService]
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
