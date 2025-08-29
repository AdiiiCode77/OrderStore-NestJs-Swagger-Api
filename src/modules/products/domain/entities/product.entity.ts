import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductTypesEnum } from '../enums/product.enum';
import { User } from 'src/modules/user/domain/entities/user.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Productname: string;

  @Column()
  Description: string

  @Column({type: 'text' , enum: ProductTypesEnum, nullable: false})
  type:string;

  @Column()
  Price: string;

    @ManyToOne(() => User, (user) => user.product, { eager: false, onDelete: 'CASCADE' })
  owner: User;

}
