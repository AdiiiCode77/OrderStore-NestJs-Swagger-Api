import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/domain/entities/user.entity";
import { UsersModule } from "../user/user.module";
import { Products } from "../products/domain/entities/product.entity";
import { Orders } from "./domain/entities/order.entity";
import { OrderService } from "./application/order.service";
import { OrderController } from "./interface/order.controller";
import { Productmodule } from "../products/product.module";


@Module({
        imports: [TypeOrmModule.forFeature([Products, Orders, User]), Productmodule, UsersModule],
        providers: [OrderService],
        controllers: [OrderController],
        exports: [OrderService],
    })

export class OrderModule {}
