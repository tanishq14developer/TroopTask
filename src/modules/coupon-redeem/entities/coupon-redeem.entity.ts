import { UserEntity } from "./../../user/user.entity";
import { AbstractEntity } from './../../../shared/entity/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Coupons' })
export class Coupon extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    couponId: string;
    @Column({ length: 255, nullable: true })
    couponName: string;
    @Column({ length: 255, nullable: true })
    couponCode: string
    @Column({ nullable: true })
    discountPercentage: number;
    @Column({ nullable: false, default: false })
    isRedeemed: boolean;
    @ManyToOne(() => UserEntity, user => user.redeemedCoupons)
    @JoinColumn({ name: 'redeemedUserId' })
    redeemedUserId: UserEntity;


}
