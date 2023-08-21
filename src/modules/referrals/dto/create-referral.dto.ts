import { ApiProperty } from "@nestjs/swagger";

export class CreateReferralDto {

    @ApiProperty()
    referrerId: string;

    @ApiProperty()
    referringUserId: string;

}
