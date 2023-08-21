import { MigrationInterface, QueryRunner } from "typeorm";

export class ReferralMig1692560315111 implements MigrationInterface {
    name = 'ReferralMig1692560315111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Rewards" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "rewards_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reward_amount" integer NOT NULL, "referring_user_user_id" uuid, CONSTRAINT "PK_1b3846c8bd1f7b16e64d4a3e726" PRIMARY KEY ("rewards_id"))`);
        await queryRunner.query(`ALTER TABLE "Rewards" ADD CONSTRAINT "FK_3b3505977497e3122fc312df521" FOREIGN KEY ("referring_user_user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Rewards" DROP CONSTRAINT "FK_3b3505977497e3122fc312df521"`);
        await queryRunner.query(`DROP TABLE "Rewards"`);
    }

}
