import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from 'typeorm';
import { Products } from "../domain/entities/product.entity";
import { UsersService } from "src/modules/user/application/user.service";
import { CreateProductDto } from "../domain/dto/product.dto";


@Injectable()
export class ProductsService{
    constructor(@InjectRepository(Products) private repo: Repository<Products>,
    private readonly users: UsersService
){}

async create(ownerId: number, dto: CreateProductDto) {
  const owner = await this.users.findById(ownerId);
  const owenType = owner?.type;
  if(owenType !== 'Admin'){
    throw new NotFoundException('Only Admin can create product'); // handle properly
  }
  if (!owner) {
    throw new NotFoundException('Owner not found'); // handle properly
  }
  const Products = this.repo.create({
    ...dto,
    owner,
  });

  return this.repo.save(Products);
}

async GetAllProducts(){
  return this.repo.find();
}

async GetOnlyProductsForAdmin(ownerId: number){
  return this.repo.find({relations: ['owner'], where: {owner: {id: ownerId}}})
}

async SearchProductBytype(type: string){
  return this.repo.find({where: {type: Like(`%${type}%`)}})
}
}