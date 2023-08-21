import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { CommonRequestUser } from 'shared/dto/common-request-user.interface';

@Controller('rewards')
@ApiTags('rewards')
export class RewardsController {
    constructor(private readonly rewardsService: RewardsService) { }




    @Get('getRewardsByUsers')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    findAll(@Req() request: CommonRequestUser) {
        return this.rewardsService.getUserRewards(request);
    }

    /*  @Get(':id')
     findOne(@Param('id') id: string) {
         return this.rewardsService.findOne(+id);
     }
 
     @Patch(':id')
     update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
         return this.rewardsService.update(+id, updateRewardDto);
     }
 
     @Delete(':id')
     remove(@Param('id') id: string) {
         return this.rewardsService.remove(+id);
     } */
}
