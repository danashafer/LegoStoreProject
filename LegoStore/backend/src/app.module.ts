import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
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
      autoLoadEntities: true,
      synchronize: false,
    }),

    UserModule,
  ],
})
export class AppModule {}
