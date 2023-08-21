import { UserEntity } from './../../user/user.entity';
import { AbstractEntity } from './../../../shared/entity/abstract.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Rewards")
export class Rewards extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    rewardsId: string;

    @ManyToOne(() => UserEntity)
    referringUser: UserEntity;

    @Column()
    rewardAmount: number;


}
