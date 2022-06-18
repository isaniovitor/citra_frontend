import type { JobData } from './job';

export interface CandidacyData {
  candidaturaId?: string | undefined;
  currentJobs: JobData[] | [];
  vacancyID: string;
  userID: string;
}
