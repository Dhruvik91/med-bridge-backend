import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../../app.module';
import { seedMasterData } from './master.seed';
import { Logger } from '@nestjs/common';

async function run() {
    const logger = new Logger('Seed');
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    logger.log('🌱 Running production seed');

    try {
        await seedMasterData(dataSource);
        logger.log('✅ Seed completed');
    } catch (error) {
        logger.error('❌ Seed failed:', error);
    } finally {
        await app.close();
        process.exit(0);
    }
}

run();
