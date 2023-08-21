import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rewards } from './entities/reward.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rewards])],
    exports: [RewardsService],
    controllers: [RewardsController],
    providers: [RewardsService]
})
export class RewardsModule { }
