import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { UserEntity } from "modules/user/user.entity";

export class CreateRewardDto {


    @ApiProperty()
    referrerId: string;

    @ApiProperty()
    referringUserId: string;

    @ApiProperty()
    amount: number;

}

export class RewardResponseDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    referrerId: string;

    @ApiProperty()
    referringUserId: UserEntity;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;

    constructor(reward: RewardResponse) {
        this.id = reward.id;
        this.referrerId = reward.referrerId;
        this.referringUserId = reward.referringUserId;
        this.amount = reward.amount;

    }

}

interface RewardResponse {
    id: string;
    referrerId: string;
    referringUserId: UserEntity;
    amount: number;
}


