import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';


@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ session: true })
    ],
    controllers:[AuthController],
    providers:[AuthService,LocalStrategy,SessionSerializer],
    exports:[AuthService]
})

export class AuthModule {}