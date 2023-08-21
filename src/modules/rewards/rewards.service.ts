import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/user.entity';
import { UserService } from 'modules/user/user.service';
import { CommonRequestUser } from 'shared/dto/common-request-user.interface';
import { Repository } from 'typeorm';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { Rewards } from './entities/reward.entity';

@Injectable()
export class RewardsService {
    constructor(
        @InjectRepository(Rewards)
        private readonly rewardsRepository: Repository<Rewards>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {

    }
    async getUserRewards(request: CommonRequestUser): Promise<Rewards[]> {

        const user = await this.userService.findOne(request.user.userId);
        console.log('====================================');
        console.log(user);
        console.log('====================================');

        return this.rewardsRepository
            .createQueryBuilder('reward')
            .leftJoinAndSelect('reward.referringUser', 'referringUser')
            .where('referringUser.userId = :referringUserId', { referringUserId: user?.userId })
            .getMany();
    }


    async createReward(referring: UserEntity, referred: UserEntity, amount: number) {
        const referral = this.rewardsRepository.create({
            rewardAmount: amount,
            referringUser: referring,
            referredUser: referred,


        });
        return this.rewardsRepository.save(referral);



    }

    findAll() {
        return `This action returns all rewards`;
    }

    findOne(id: number) {
        return `This action returns a #${id} reward`;
    }

    update(id: number, updateRewardDto: UpdateRewardDto) {
        return `This action updates a #${id} reward`;
    }

    remove(id: number) {
        return `This action removes a #${id} reward`;
    }
}
