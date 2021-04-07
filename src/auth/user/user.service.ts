import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import {User} from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findByEmail(email: string, password: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email,
                password: password
            }
        });
    }

    async findOne(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                username: username,
            }
        });
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

}