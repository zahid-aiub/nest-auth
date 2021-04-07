import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UserService } from './user/user.service';
import {JwtModule} from "@nestjs/jwt";
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import {LocalStrategy} from "./auth/auth/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./auth/auth/jwt.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '60s' },
        }),
        PassportModule,
    ],
    providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, JwtModule],
    controllers: [AuthController]
})
export class AuthModule {}
