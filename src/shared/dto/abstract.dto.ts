import { ApiProperty } from '@nestjs/swagger';

import type { AbstractEntity } from './../entity/abstract.entity';

export class AbstractDto {

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    updatedAt?: Date;

    @ApiProperty()
    deletedAt?: Date;

    constructor(entity: AbstractEntity) {
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
}
