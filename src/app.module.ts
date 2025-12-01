import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmConnectionModule } from './database/typeorm-root.module';
import { DatabaseModule } from './database/database.module';

import { UsersModule } from './modules/users/users.module';
import { DoctorProfileModule } from './modules/doctor-profile/doctor-profile.module';
import { EmployerProfileModule } from './modules/employer-profile/employer-profile.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { LocationsModule } from './modules/locations/locations.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { SavedJobsModule } from './modules/saved-jobs/saved-jobs.module';
import { JobNotesModule } from './modules/job-notes/job-notes.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { AwsModule } from './modules/aws/aws.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';
// import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    TypeOrmConnectionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,

    // Core modules
    UsersModule,
    UserAuthModule,

    // Profile modules
    DoctorProfileModule,
    EmployerProfileModule,
    OrganizationsModule,

    // Job board modules
    SpecialtiesModule,
    LocationsModule,
    JobsModule,
    ApplicationsModule,
    SavedJobsModule,
    JobNotesModule,

    // Utility modules
    AttachmentsModule,
    AwsModule,
    UploadsModule,

    // Future: Messaging
    // MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
