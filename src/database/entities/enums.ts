export enum UserRole {
  candidate = 'candidate',
  employer = 'employer',
  admin = 'admin',
}

export enum JobType {
  full_time = 'full_time',
  part_time = 'part_time',
  contract = 'contract',
  temporary = 'temporary',
  internship = 'internship',
  remote = 'remote',
}

export enum JobStatus {
  draft = 'draft',
  published = 'published',
  closed = 'closed',
  archived = 'archived',
}

export enum ApplicationStatus {
  applied = 'applied',
  viewed = 'viewed',
  shortlisted = 'shortlisted',
  interview = 'interview',
  offer = 'offer',
  hired = 'hired',
  rejected = 'rejected',
  withdrawn = 'withdrawn',
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
  prefer_not_say = 'prefer_not_say',
}
