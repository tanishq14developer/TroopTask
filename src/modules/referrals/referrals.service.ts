import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/user.entity';
import { UserService } from 'modules/user/user.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { Referral } from './entities/referral.entity';

@Injectable()
export class ReferralsService {
    constructor(
        @InjectRepository(Referral)
        private readonly referalRepository: Repository<Referral>,
    ) {

    }



    async createReferral(referring: UserEntity, referred: UserEntity) {
        const referral = this.referalRepository.create({
            referringUser: referring,
            referredUser: referred
        });
        return this.referalRepository.save(referral);



    }

    findAll() {
        return `This action returns all referrals`;
    }

    findOne(id: number) {
        return `This action returns a #${id} referral`;
    }

    update(id: number, updateReferralDto: UpdateReferralDto) {
        return `This action updates a #${id} referral`;
    }

    remove(id: number) {
        return `This action removes a #${id} referral`;
    }
}
