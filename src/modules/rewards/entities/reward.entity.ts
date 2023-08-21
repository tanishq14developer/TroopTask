import { UserEntity } from './../../user/user.entity';
import { AbstractEntity } from './../../../shared/entity/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Rewards")
export class Rewards extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    rewardsId: string;

    @ManyToOne(() => UserEntity, user => user.userId)
    @JoinColumn({ name: 'referringUserId' })
    referringUser: UserEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'referredUserId' })
    referredUser: UserEntity;

    @Column()
    rewardAmount: number;


}
