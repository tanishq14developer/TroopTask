import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralsModule } from 'modules/referrals/referrals.module';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ReferralsModule],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule { }
