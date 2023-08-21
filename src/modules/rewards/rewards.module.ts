import { forwardRef, Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rewards } from './entities/reward.entity';
import { UserModule } from './../../modules/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Rewards]), forwardRef(() => UserModule)],
    exports: [RewardsService],
    controllers: [RewardsController],
    providers: [RewardsService]
})
export class RewardsModule { }
