import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';
import * as crypto from 'crypto';
import {Role} from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    username: string;

    @Column({default: ''})
    avatar: string;

    @Column()
    email: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }

    @Column()
    password: string;

    @Column({ type: 'simple-array', select: false })
    roles: Role[];
}