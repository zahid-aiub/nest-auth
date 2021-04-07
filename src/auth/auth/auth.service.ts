import { Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';
import {User} from "../user.entity";
import {strict} from "assert";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    /*private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email, userData.password);
    }*/

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

   /* public async login(user : User): Promise<any>{
        return this.validateUser(user.username, user.password).then((userData)=>{
            if(!userData){
                return {
                    status: 403,
                    message: "Wrong username or password!"
                };
            }
            let payload = { username: user.username, sub: user.userId };
            const accessToken = this.jwtService.sign(payload);

            return {
                // expires_in: 3600,
                access_token: accessToken,
                user_id: userData.username,
                status: 200
            };

        });
    }*/

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    }
}