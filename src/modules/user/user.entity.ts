
import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { RoleType } from './../../constants';
import { AbstractEntity } from './../../shared/entity/abstract.entity';
import { Coupon } from './../../modules/coupon-redeem/entities/coupon-redeem.entity';


@Entity({ name: 'Users' })
export class UserEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column({ length: 255, nullable: true })
    fullName: string;
    @Column({ length: 255, nullable: true })
    email: string
    @Column({ length: 255, nullable: true })
    password: string;
    @Column({ length: 255, nullable: true })
    referralCode: string;
    @ManyToOne(() => UserEntity, { nullable: true })
    referredBy: UserEntity;
    @OneToMany(() => Coupon, coupon => coupon.redeemedUserId)
    redeemedCoupons: Coupon[];
    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

}
