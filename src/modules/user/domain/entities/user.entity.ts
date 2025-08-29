import { LoginTypesEnum } from 'src/modules/auth/domain/enums/product.enum';
import { Products } from 'src/modules/products/domain/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username:string;

  @Column({type: 'text' , enum: LoginTypesEnum, default: 'User'})
  type: string;
  
  @Column()
  passwordHash: string;

  @ManyToOne(()=> Products, (product) => product.id)
  product: Products

  
}
