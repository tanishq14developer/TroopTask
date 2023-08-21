import { Module } from '@nestjs/common';
import { CouponRedeemService } from './coupon-redeem.service';
import { CouponRedeemController } from './coupon-redeem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon-redeem.entity';
import { UserModule } from 'modules/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Coupon]), UserModule],
    controllers: [CouponRedeemController],
    exports: [CouponRedeemService],
    providers: [CouponRedeemService]
})
export class CouponRedeemModule { }
