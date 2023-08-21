import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp',
    })
    deletedAt: Date;
}
