import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConnectionModule } from './database/typeorm-root.module';
import { DatabaseModule } from './database/database.module';

import { UsersModule } from './modules/users/users.module';
import { DoctorProfileModule } from './modules/doctor-profile/doctor-profile.module';
// MVP: jobs + applications support job search & apply
import { JobsModule } from './modules/jobs/jobs.module';
import { ApplicationsModule } from './modules/applications/applications.module';
// MVP: temporarily hide hospital profile & messaging APIs
// import { HospitalProfileModule } from './modules/hospital-profile/hospital-profile.module';
// import { MessagesModule } from './modules/messages/messages.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';

@Module({
  imports: [
    TypeOrmConnectionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    DoctorProfileModule,
    // MVP: only expose doctor profile, job search, and job applications
    JobsModule,
    ApplicationsModule,
    // HospitalProfileModule,
    // MessagesModule,
    UserAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
