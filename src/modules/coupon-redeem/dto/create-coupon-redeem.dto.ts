import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCouponRedeemDto {
    @ApiProperty()
    @IsString()
    couponName: string;
    @ApiProperty()
    discountPercentage: number;


}
