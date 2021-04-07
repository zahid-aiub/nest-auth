import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {User} from './user/user.entity';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "../gurds/local-auth.guard";
import {JwtAuthGuard} from "../gurds/jwt-auth.guard";
import {RolesGuard} from "../gurds/roles.guard";
import {Roles} from "../decorators/roles.decorator";
import {Role} from "../enums/role.enum";
import {stat} from "fs";

@Controller('auth')
export class AuthController {
    constructor(private readonly  authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() username: string, pass: string): Promise<any> {
        return this.authService.login(username, pass);
    }

    @Post('register')
    async register(@Body() user: User): Promise<any> {
        return this.authService.register(user);
    }

    @Get('open')
    async openApi(): Promise<any> {
        return "Open API";
    }


    @Get('secure')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async secureApi(): Promise<any> {
        return "Secure API";
    }

}
