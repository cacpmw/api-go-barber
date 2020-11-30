import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class addForeignKeyToAppointmentsTable1604494268282
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'FK_appointment_provider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'appointments',
            'FK_appointment_provider',
        );
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
