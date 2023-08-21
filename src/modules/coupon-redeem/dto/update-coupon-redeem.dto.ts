import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateCouponRedeemDto } from './create-coupon-redeem.dto';

export class UpdateCouponRedeemDto {
    @ApiProperty()
    @IsString()
    couponCode: string;

}
