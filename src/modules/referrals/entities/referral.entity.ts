import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from './../../user/user.entity';

@Entity()
export class Referral {
    @PrimaryGeneratedColumn('uuid')
    referralId: string;

    @ManyToOne(() => UserEntity)
    referringUser: UserEntity;

    @ManyToOne(() => UserEntity)
    referredUser: UserEntity;

    @CreateDateColumn()
    referralDate: Date;
}
