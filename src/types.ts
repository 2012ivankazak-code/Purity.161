export type SegmentType = 'b2b' | 'b2c';

export interface LeadSubmissionPayload {
  name: string;
  phone: string;
  company?: string;
  email?: string;
  segment: SegmentType;
  propertyType?: string;
  cleaningType?: string;
  area?: number;
  addons?: string[];
  estimatedTotal?: number;
  comment?: string;
  source: string;
}

export interface LeadRecord extends LeadSubmissionPayload {
  id: string;
  createdAt: string;
  telegramStatus?: 'sent' | 'simulated' | 'error';
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  area: string;
  location: string;
  duration: string;
  task: string;
  result: string;
  image: string;
  beforeLabel?: string;
  afterLabel?: string;
}
