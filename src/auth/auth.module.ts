import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';


@Module({
    imports:[
        ConfigModule.forFeature(jwtConfig),
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        PassportModule.register({ session: true })
    ],
    controllers:[AuthController],
    providers:[AuthService,LocalStrategy,SessionSerializer],
    exports:[AuthService]
})

export class AuthModule {}