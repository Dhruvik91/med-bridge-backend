import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConnectionModule } from './database/typeorm-root.module';
import { DatabaseModule } from './database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DoctorProfileModule } from './modules/doctor-profile/doctor-profile.module';
import { HospitalProfileModule } from './modules/hospital-profile/hospital-profile.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { MessagesModule } from './modules/messages/messages.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';

@Module({
  imports: [
    TypeOrmConnectionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    DoctorProfileModule,
    HospitalProfileModule,
    JobsModule,
    ApplicationsModule,
    MessagesModule,
    UserAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
