import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {User} from './user/user.entity';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "../gurds/local-auth.guard";
import {JwtAuthGuard} from "../gurds/jwt-auth.guard";

@Controller('auth')
export  class  AuthController {
    constructor(private  readonly  authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user: User): Promise<any> {
        return this.authService.login(user);
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
    // @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    async secureApi(): Promise<any> {
        return "Secure API";
    }

}
