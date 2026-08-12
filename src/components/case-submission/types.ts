export type SendMethod = 'whatsapp' | 'email' | '';

export type PaymentMethod = 'online' | 'cash' | 'bank_transfer' | '';

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
  shade: string;
  colorNotes: string;
  instructions: string;
};

export type CaseSubmissionData = {
  doctor: DoctorInformation;
  caseDetails: CaseDetails;
  sendMethod: SendMethod;
  paymentMethod: PaymentMethod;
  confirmed: boolean;
};

export const PAYMENT_METHOD_LABELS: Record<Exclude<PaymentMethod, ''>, string> = {
  online: 'Online Payment',
  cash: 'Cash on Delivery',
  bank_transfer: 'Bank Transfer',
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
    shade: 'A2',
    colorNotes: '',
    instructions: '',
  },
  sendMethod: '',
  paymentMethod: 'bank_transfer',
  confirmed: false,
};
