import { Module } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { ReferralsController } from './referrals.controller';
import { Referral } from './entities/referral.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'modules/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Referral])],
    exports: [ReferralsService],
    controllers: [ReferralsController],
    providers: [ReferralsService]
})
export class ReferralsModule { }
