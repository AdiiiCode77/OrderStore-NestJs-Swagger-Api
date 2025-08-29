import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "./domain/entities/product.entity";
import { ProductsController } from "./interface/product.controller";
import { ProductsService } from "./application/product.service";
import { User } from "../user/domain/entities/user.entity";
import { UsersModule } from "../user/user.module";


@Module({
        imports: [TypeOrmModule.forFeature([Products, User]), UsersModule],
        providers: [ProductsService],
        controllers: [ProductsController],
        exports: [ProductsService],
    })

export class Productmodule {}
