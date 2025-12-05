import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { LegoModule } from './modules/lego.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { User } from './entities/User.entity';
import { Lego } from './entities/Lego.entity';
import { Cart } from './entities/Cart.entity';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      schema: 'legostore',
      entities: [User, Lego, Cart],
      autoLoadEntities: true,
      synchronize: false,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    UserModule,
    LegoModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}
