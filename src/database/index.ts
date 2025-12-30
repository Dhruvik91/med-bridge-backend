import { User } from './entities/user.entity';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { EmployerProfile } from './entities/employer-profile.entity';
import { Organization } from './entities/organization.entity';
import { Specialty } from './entities/specialty.entity';
import { Location } from './entities/location.entity';
import { Job } from './entities/job.entity';
import { JobSpecialty } from './entities/job-specialty.entity';
import { Application } from './entities/application.entity';
import { SavedJob } from './entities/saved-job.entity';
import { JobNote } from './entities/job-note.entity';
import { Attachment } from './entities/attachment.entity';
import { Message } from './entities/message.entity';
import { Notification } from './entities/notification.entity';
import { AuditLog } from './entities/audit-log.entity';
import { Qualification } from './entities/qualification.entity';

export const AllEntities = [
  User,
  DoctorProfile,
  EmployerProfile,
  Organization,
  Specialty,
  Location,
  Job,
  JobSpecialty,
  Application,
  SavedJob,
  JobNote,
  Attachment,
  Message,
  Notification,
  AuditLog,
  Qualification,
];

export const CustomRepository = [

];
