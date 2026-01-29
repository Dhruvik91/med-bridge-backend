import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Qualification } from '../entities/qualification.entity';
import { Specialty } from '../entities/specialty.entity';
import { HEALTHCARE_QUALIFICATIONS, HEALTHCARE_SPECIALITIES } from './data';

export async function seedMasterData(dataSource: DataSource) {
    const logger = new Logger('Master Seed');
    logger.log('Seeding master data...');
    try {
        await dataSource.transaction(async (manager) => {
            const qualificationRepo = manager.getRepository(Qualification);
            const specialityRepo = manager.getRepository(Specialty);

            // Qualifications
            for (const name of HEALTHCARE_QUALIFICATIONS) {
                await qualificationRepo
                    .createQueryBuilder()
                    .insert()
                    .values({ name })
                    .orIgnore() // 🔥 avoids duplicates
                    .execute();
            }

            // Specialities
            for (const name of HEALTHCARE_SPECIALITIES) {
                await specialityRepo
                    .createQueryBuilder()
                    .insert()
                    .values({ name })
                    .orIgnore()
                    .execute();
            }
        });
        logger.log('✅ Master data seeded successfully');
    }
    catch (error) {
        logger.error('Failed to seed master data', error);
    }
}
