export type SendMethod = 'whatsapp' | 'email';

export type DoctorInformation = {
  fullName: string;
  email: string;
  countryCode: string;
  whatsapp: string;
  clinicName: string;
  country: string;
  city: string;
  address: string;
};

export type CaseDetails = {
  designType: string;
  toothNumbers: string;
  material: string;
  otherMaterial: string;
  shade: string;
  colorNotes: string;
  instructions: string;
};

export type CaseSubmissionData = {
  doctor: DoctorInformation;
  caseDetails: CaseDetails;
  sendMethod: SendMethod;
  confirmed: boolean;
};

export const INITIAL_CASE_DATA: CaseSubmissionData = {
  doctor: {
    fullName: '',
    email: '',
    countryCode: '+20',
    whatsapp: '',
    clinicName: '',
    country: '',
    city: '',
    address: '',
  },
  caseDetails: {
    designType: 'Crown',
    toothNumbers: '',
    material: 'Crown & Bridge Resin',
    otherMaterial: '',
    shade: 'A2',
    colorNotes: '',
    instructions: '',
  },
  sendMethod: 'whatsapp',
  confirmed: false,
};
