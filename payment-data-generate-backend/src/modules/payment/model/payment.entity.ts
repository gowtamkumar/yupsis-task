import "reflect-metadata";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("payments")
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  amount!: number;

  @Column()
  timestamp?: string;

  @Column()
  status!: string;

  @Column()
  processing!: number;
}
