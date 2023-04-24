import { Report } from './Report';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  reports: Report[];
}
