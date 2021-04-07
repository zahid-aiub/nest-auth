import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {User} from "./auth/user.entity";
import {RolesGuard} from "./gurds/roles.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'islamic_book',
          "entities": [User],  //"dist/**/*.entity{.ts,.js}"
          synchronize: true,
      }),
      AuthModule,

  ],
  controllers: [AppController],
  providers: [
      {
          provide: APP_GUARD,
          useClass: RolesGuard,
      }
      ,AppService],
})
export class AppModule {}
