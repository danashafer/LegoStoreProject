import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { LegoModule } from './lego/lego.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { User } from './users/User.entity';
import { Lego } from './lego/Lego.entity';
import { Cart } from './cart/Cart.entity';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './orders/order.module';
import { UploadModule } from './uploads/upload.module';
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
    CartModule,
    OrderModule,
    UploadModule,
  ],
})
export class AppModule {}
