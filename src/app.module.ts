import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConnectionModule } from './database/typeorm-root.module';
import { DatabaseModule } from './database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { PropertyOwnerModule } from './modules/property-owner/property-owner.module';
import { PropertyModule } from './modules/property/property.module';
import { RoomModule } from './modules/room/room.module';
import { BedModule } from './modules/bed/bed.module';
import { StaffModule } from './modules/staff/staff.module';
import { MonthlyExpenseModule } from './modules/monthly-expense/monthly-expense.module';
import { GuestModule } from './modules/guest/guest.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmConnectionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    PropertyOwnerModule,
    PropertyModule,
    RoomModule,
    BedModule,
    StaffModule,
    MonthlyExpenseModule,
    GuestModule,
    NotificationModule,
    TransactionModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
