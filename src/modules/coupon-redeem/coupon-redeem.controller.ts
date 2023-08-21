import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { CommonRequestUser } from 'shared/dto/common-request-user.interface';
import { ApiResponse } from 'utils';
import { CouponRedeemService } from './coupon-redeem.service';
import { CreateCouponRedeemDto } from './dto/create-coupon-redeem.dto';
import { UpdateCouponRedeemDto } from './dto/update-coupon-redeem.dto';
import { Coupon } from './entities/coupon-redeem.entity';

@Controller('coupon-redeem')
@ApiTags('coupon-redeem')
export class CouponRedeemController {
    constructor(private readonly couponRedeemService: CouponRedeemService) { }

    @Post('generate-coupon-code')
    create(@Body() createCouponRedeemDto: CreateCouponRedeemDto): Promise<Coupon> {
        const createdCoupon = this.couponRedeemService.createCoupon(createCouponRedeemDto);
        return createdCoupon;
    }

    @Post('redeem-coupon')
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    redeemCoupon(@Body() updateCouponRedeemDto: UpdateCouponRedeemDto, @Req() commonReqUser: CommonRequestUser): Promise<ApiResponse<Coupon | null>> {
        const createdCoupon = this.couponRedeemService.redeemCoupon(updateCouponRedeemDto, commonReqUser);
        return createdCoupon;
    }

    @Get('get-all-coupons')
    findCoupons(): Promise<ApiResponse<Coupon[]>> {
        return this.couponRedeemService.findAllCoupon();
    }



    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.couponRedeemService.remove(+id);
    }
}
