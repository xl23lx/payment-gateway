import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import jwtConfig from 'src/config/jwt.config';

@Module({
    imports:[
        ConfigModule.forFeature(jwtConfig),
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync(jwtConfig.asProvider()),
],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})

export class AuthModule {}