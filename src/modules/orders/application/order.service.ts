import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/modules/products/domain/entities/product.entity";
import { Repository } from "typeorm";
import { Orders } from "../domain/entities/order.entity";
import { User } from "src/modules/user/domain/entities/user.entity";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { MESSAGES } from "@nestjs/core/constants";

@Injectable()
export class OrderService{
    constructor(@InjectRepository(Products) private product: Repository<Products>,
    @InjectRepository(Orders) private order: Repository<Orders>,
    @InjectRepository(User) private users: Repository<User>
){}

async createOrder(productId: number, userId: number) {
  // Fetch product
  const productOrdered = await this.product.findOneBy({ id: productId });
  if (!productOrdered) {
    throw new Error('Product not found');
  }

  // Fetch user
  const user = await this.users.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }

  // Create new order
  const order = this.order.create({
    createdBy: user,
    ProductOrdered: productOrdered,
  });
  // Save order in DB
  return await this.order.save(order);
}

async getOrders(userId: number) {
  // Fetch user
  const user = await this.users.findOneBy({ id: userId });
  if (!user) {
    throw new Error('User not found');
  }

  // Fetch orders for the user
  return await this.order.find({
    where: { createdBy: { id: userId } },
    relations: ['ProductOrdered', 'createdBy'],
  });
}

async getAllOrders(usertype: string) {
  if(usertype == 'Admin')
  {
    return await this.order.find({
      relations: ['ProductOrdered', 'createdBy'],
    });
  }
  else{
    //send Exception handler message
    return "You are not authorized to view all orders"
}}
}