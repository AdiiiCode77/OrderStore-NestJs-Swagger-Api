import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Productmodule } from './modules/products/product.module';
import { User } from './modules/user/domain/entities/user.entity';
import { Products } from './modules/products/domain/entities/product.entity';
import { OrderModule } from './modules/orders/orders.module';
import { Orders } from './modules/orders/domain/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Products, Orders],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    Productmodule,
    OrderModule
  ],

})
export class AppModule {}
