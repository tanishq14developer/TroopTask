import { MigrationInterface, QueryRunner } from "typeorm";

export class Coupon1692649494237 implements MigrationInterface {
    name = 'Coupon1692649494237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Coupons" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "coupon_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "coupon_name" character varying(255), "coupon_code" character varying(255), "discount_percentage" integer, "is_redeemed" boolean NOT NULL DEFAULT false, "referral_code" character varying(255), "redeemedUserId" uuid, CONSTRAINT "PK_e92d62784698bc89480ac0b033b" PRIMARY KEY ("coupon_id"))`);
        await queryRunner.query(`ALTER TABLE "Coupons" ADD CONSTRAINT "FK_033d45888fd447ab74005c529bc" FOREIGN KEY ("redeemedUserId") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Coupons" DROP CONSTRAINT "FK_033d45888fd447ab74005c529bc"`);
        await queryRunner.query(`DROP TABLE "Coupons"`);
    }

}
