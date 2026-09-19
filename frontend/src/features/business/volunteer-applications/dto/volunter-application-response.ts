export interface VolunteerApplicationResponse {
  title: string;
  subtitle?: string;
  description: string;
  requirements?: string;
  minAge?: number;
  maxAge?: number;
  address?: string;
  googleMapLinkAddress?: string;
  startDate: string;
  endDate: string;
  contactEmail?: string;
  contactPhone?: string;
  isCertificated: boolean;
  urgency: string;
}
