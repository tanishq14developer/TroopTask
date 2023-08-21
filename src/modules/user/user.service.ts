import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRequestDto } from './dto/user-request.dto';
import { generateReferralCode } from 'utils';
import { ReferralsService } from 'modules/referrals/referrals.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly referralService: ReferralsService
    ) { }


    async createUser(userInfo: Partial<UserRequestDto>): Promise<UserEntity> {

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(userInfo?.password!, saltRounds);
        const referralCode = generateReferralCode(7);
        const referredBy: UserEntity | null = await this.userRepository.findOne({ where: { referralCode: userInfo?.referralCode } });

        const newUser = this.userRepository.create({
            fullName: userInfo?.fullName,
            email: userInfo.email,
            password: hashPassword,
            referralCode: referralCode,
            referredBy: referredBy!!,

        });
        const savedUser = await this.userRepository.save(newUser);
        if (referredBy) {
            await this.referralService.createReferral(referredBy, savedUser);
        }
        return savedUser;
    }

    async getUserByEmail(by: { email?: string }) {
        return await this.userRepository.findOne({ where: by });

    }

    async getUserById(userId: string) {
        return await this.userRepository.findOne({ where: { userId: userId } });
    }

    async find(by: Partial<UserEntity>): Promise<UserEntity | null> {
        return this.userRepository.findOneBy({ ...by });
    }

    async findOne(userId: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { userId } });
    }




    updateUser(userId: string, user: UserDto) {
        return this.userRepository.update({ userId: userId }, user);
    }
}
