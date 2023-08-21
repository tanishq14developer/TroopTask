import { Test, TestingModule } from '@nestjs/testing';
import { CouponRedeemController } from './coupon-redeem.controller';
import { CouponRedeemService } from './coupon-redeem.service';

describe('CouponRedeemController', () => {
  let controller: CouponRedeemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponRedeemController],
      providers: [CouponRedeemService],
    }).compile();

    controller = module.get<CouponRedeemController>(CouponRedeemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
