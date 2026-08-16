export type SendMethod = 'whatsapp' | 'email' | '';

export type PaymentMethod = 'instapay' | 'paymob' | '';

export const RESTORATIVE_MATERIALS = ['Printed', 'Milled'] as const;

export const RESTORATION_SHADES = ['A1', 'A2', 'A3'] as const;

export type RestorativeMaterial = (typeof RESTORATIVE_MATERIALS)[number];

export type RestorationShade = (typeof RESTORATION_SHADES)[number];

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
  material: RestorativeMaterial | '';
  shade: RestorationShade | '';
  colorNotes: string;
  instructions: string;
};

export type CaseAttachments = {
  stlFile: File | null;
  intraoralFile: File | null;
};

export type CaseSubmissionData = {
  doctor: DoctorInformation;
  caseDetails: CaseDetails;
  sendMethod: SendMethod;
  attachments: CaseAttachments;
  paymentMethod: PaymentMethod;
  confirmed: boolean;
};

export const PAYMENT_METHOD_LABELS: Record<Exclude<PaymentMethod, ''>, string> = {
  instapay: 'InstaPay',
  paymob: 'Paymob',
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
    material: 'Printed',
    shade: 'A2',
    colorNotes: '',
    instructions: '',
  },
  sendMethod: '',
  attachments: {
    stlFile: null,
    intraoralFile: null,
  },
  paymentMethod: '',
  confirmed: false,
};
