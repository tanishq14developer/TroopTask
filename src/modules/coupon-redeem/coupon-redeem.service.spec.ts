import { Test, TestingModule } from '@nestjs/testing';
import { CouponRedeemService } from './coupon-redeem.service';

describe('CouponRedeemService', () => {
  let service: CouponRedeemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponRedeemService],
    }).compile();

    service = module.get<CouponRedeemService>(CouponRedeemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
