import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { Products } from 'src/modules/products/domain/entities/product.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

    @ManyToOne(() => User, (user) => user.product, { eager: false, onDelete: 'CASCADE' })
  createdBy: User;

      @ManyToOne(() => Products, (product) => product.id, { eager: false, onDelete: 'CASCADE' })
  ProductOrdered: Products;

}
