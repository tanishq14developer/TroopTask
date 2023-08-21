import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/user.entity';
import { UserService } from 'modules/user/user.service';
import { CommonRequestUser } from 'shared/dto/common-request-user.interface';
import { Repository } from 'typeorm';
import { ApiResponse } from 'utils';
import { CreateCouponRedeemDto } from './dto/create-coupon-redeem.dto';
import { UpdateCouponRedeemDto } from './dto/update-coupon-redeem.dto';
import { Coupon } from './entities/coupon-redeem.entity';

@Injectable()
export class CouponRedeemService {

    constructor(
        @InjectRepository(Coupon)
        private readonly couponRedeemRepository: Repository<Coupon>,
        private readonly userService: UserService,
    ) { }
    async createCoupon(CreateCouponRedeemDto: CreateCouponRedeemDto): Promise<Coupon> {
        const code = await this.generateRandomCode();
        console.log('====================================');
        console.log(code);
        console.log('====================================');
        const createdCoupon = this.couponRedeemRepository.create({
            couponName: CreateCouponRedeemDto.couponName,
            discountPercentage: CreateCouponRedeemDto.discountPercentage,
            couponCode: code,

        });
        await this.couponRedeemRepository.save(createdCoupon);
        return createdCoupon;





    }
    async redeemCoupon(UpdateCouponRedeemDto: UpdateCouponRedeemDto, commonReq: CommonRequestUser): Promise<ApiResponse<Coupon | null>> {
        const user = await this.userService.findOne(commonReq.user.userId);
        const couponRedemption = await this.couponRedeemRepository.findOne({
            where: {
                couponCode: UpdateCouponRedeemDto.couponCode,
                isRedeemed: false, // Ensure it hasn't been redeemed already
            },
        });

        if (!couponRedemption) {
            // Handle if coupon redemption not found or already redeemed
            // You might want to throw an error or return an appropriate response
            return new ApiResponse<Coupon | null>(null, {
                displayMessage: 'Coupon not found or already redeemed',
                message: 'Coupon not found or already redeemed',
            });
        }
        if (!user) {
        } else {
            const userWithoutPassword: Partial<UserEntity> = { ...user };
            delete userWithoutPassword.password;
            console.log('====================================');
            console.log(userWithoutPassword);
            console.log('====================================');

            // Mark the coupon as redeemed and associate it with the user
            couponRedemption.isRedeemed = true;
            couponRedemption.redeemedUserId = userWithoutPassword as any;
            const finalResponse = await this.couponRedeemRepository.save(couponRedemption);

            return new ApiResponse<Coupon | null>(finalResponse, {
                displayMessage: 'Coupon redeemed successfully',
                message: 'Coupon redeemed successfully',
            });
        }
        return new ApiResponse<Coupon | null>(null, {
            displayMessage: 'Coupon not found or already redeemed',
            message: 'Coupon not found or already redeemed',
        });









    }


    async findAllCoupon(): Promise<ApiResponse<Coupon[]>> {
        const coupons = await this.couponRedeemRepository.find();
        return new ApiResponse<Coupon[]>(coupons, {
            message: 'Coupons retrieved successfully',
            displayMessage: 'Coupons retrieved successfully',
        });

    }

    async generateRandomCode(): Promise<string> {
        const codeLength = 12;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let code = '';

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            code += chars[randomIndex];
        }

        const segments = [4, 4, 4];
        let formattedCode = '';

        for (const segmentLength of segments) {
            const segment = code.substr(0, segmentLength);
            code = code.slice(segmentLength);
            formattedCode += segment + '-';
        }

        formattedCode = formattedCode.slice(0, -1); // Remove trailing hyphen
        return formattedCode;
    }

    findOne(id: number) {
        return `This action returns a #${id} couponRedeem`;
    }



    remove(id: number) {
        return `This action removes a #${id} couponRedeem`;
    }
}
function CouponRedeem(CouponRedeem: any) {
    throw new Error('Function not implemented.');
}



