import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { HealthModule } from './health/health.module';
import { validateIfAdmin } from './middleware/user_verification.middleware';
import { UserController } from './user/user.controller';

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
        url:`postgresql://${configService.get<string>('database.username')}:${configService.get<string>('database.password')}@${configService.get<string>('database.host')}:${configService.get<string>('database.port')}/${configService.get<string>('database.name')}?sslmode=verify-full`,
        ssl:true,
        entities:[__dirname+'/**/*.entity{.ts,.js}'],
        synchronize:true,
        encrypt:true,
      }),
      inject:[ConfigService]
    }),
    AuthModule,
    UserModule,
    TransactionModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateIfAdmin)
      .exclude({path:'user/register', method:RequestMethod.POST})
      .forRoutes(UserController);
  }
}
