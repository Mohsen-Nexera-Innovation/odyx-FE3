import {
  createCaseApi,
  getCaseApi,
  submitCaseApi,
  updateCaseDetailsApi,
  updateCaseDoctorApi,
  updateCaseSendMethodApi,
  uploadCaseFileApi,
  type ApiCase,
} from '@/lib/api/cases';
import {
  listCountriesApi,
  listDesignTypesApi,
  listMaterialsApi,
  type ApiCountry,
  type ApiDesignType,
  type ApiMaterial,
} from '@/lib/api/lookups';

export type DesignCaseSubmitInput = {
  doctor: {
    fullName: string;
    email: string;
    countryCode: string;
    whatsapp: string;
    clinicName: string;
    country: string;
    city: string;
    address: string;
  };
  caseDetails: {
    designType: string;
    toothNumbers: string;
    material: string;
    shade: string;
    colorNotes: string;
    instructions: string;
  };
  attachments: {
    stlFile: File | null;
    intraoralFile: File | null;
  };
};

const DESIGN_TYPE_SLUG: Record<string, string> = {
  inlay: 'single-unit',
  onlay: 'single-unit',
  crown: 'single-unit',
  veneer: 'dsd-veneers',
  'implant crown': 'surgical-guide',
};

function norm(value: string) {
  return value.trim().toLowerCase();
}

function toothNumbersFrom(value: string): string[] {
  return value
    .split(/[\s,]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function matchCountryId(countryName: string, countries: ApiCountry[]): string | undefined {
  const needle = norm(countryName);
  if (!needle) return undefined;
  const exact = countries.find((c) => norm(c.name) === needle);
  if (exact) return exact.id;
  const starts = countries.find(
    (c) => norm(c.name).startsWith(needle) || needle.startsWith(norm(c.name)),
  );
  return starts?.id;
}

export function matchDesignTypeId(
  label: string,
  types: ApiDesignType[],
): string | undefined {
  const needle = norm(label);
  if (!needle || !types.length) return undefined;
  const byName = types.find((t) => norm(t.name) === needle || norm(t.slug) === needle);
  if (byName) return byName.id;
  const slug = DESIGN_TYPE_SLUG[needle];
  if (slug) {
    const bySlug = types.find((t) => t.slug === slug);
    if (bySlug) return bySlug.id;
  }
  if (needle.includes('veneer')) {
    return types.find((t) => t.slug.includes('veneer'))?.id;
  }
  if (needle.includes('implant') || needle.includes('guide')) {
    return types.find((t) => t.slug.includes('surgical'))?.id;
  }
  return types.find((t) => t.slug === 'single-unit')?.id ?? types[0]?.id;
}

export function matchMaterialId(
  label: string,
  materials: ApiMaterial[],
): string | undefined {
  const needle = norm(label);
  if (!needle || !materials.length) return undefined;
  const exact = materials.find(
    (m) => norm(m.name) === needle || norm(m.slug) === needle || norm(m.slug).replace(/-/g, ' ') === needle,
  );
  if (exact) return exact.id;
  if (needle === 'printed' || needle === 'milled') {
    return materials.find((m) => m.slug.includes('crown'))?.id ?? materials[0]?.id;
  }
  return materials[0]?.id;
}

function caseNotes(data: DesignCaseSubmitInput): string | undefined {
  const parts = [data.caseDetails.colorNotes, data.caseDetails.instructions]
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length ? parts.join('\n') : undefined;
}

function doctorPhone(data: DesignCaseSubmitInput): string {
  return `${data.doctor.countryCode}${data.doctor.whatsapp}`.replace(/\s+/g, '');
}

export async function loadCaseLookups(): Promise<{
  countries: ApiCountry[];
  designTypes: ApiDesignType[];
  materials: ApiMaterial[];
}> {
  const [countries, designTypes, materials] = await Promise.all([
    listCountriesApi(),
    listDesignTypesApi(),
    listMaterialsApi(),
  ]);
  return { countries, designTypes, materials };
}

export async function ensureDraftCase(existingId?: string | null): Promise<ApiCase> {
  if (existingId) {
    try {
      const current = await getCaseApi(existingId);
      if (current.status === 'DRAFT') return current;
    } catch {
      /* create a fresh draft */
    }
  }
  return createCaseApi();
}

export async function submitDesignCaseWizard(input: {
  caseId?: string | null;
  data: DesignCaseSubmitInput;
  lookups: {
    countries: ApiCountry[];
    designTypes: ApiDesignType[];
    materials: ApiMaterial[];
  };
}): Promise<ApiCase> {
  const files = [input.data.attachments.stlFile, input.data.attachments.intraoralFile].filter(
    (file): file is File => Boolean(file),
  );

  const types = Array.isArray(input.lookups.designTypes) ? input.lookups.designTypes : [];
  if (!types.length) {
    throw new Error(
      'GET /design-types returned no types. Seed design types on the API (single-unit, dsd-veneers, …) and retry.',
    );
  }

  const designTypeId = matchDesignTypeId(input.data.caseDetails.designType, types);
  if (!designTypeId) {
    throw new Error('Could not match a design type. Check that GET /design-types is available.');
  }

  const draft = await ensureDraftCase(input.caseId);
  const countryId = matchCountryId(input.data.doctor.country, input.lookups.countries);
  const materialId = matchMaterialId(
    input.data.caseDetails.material,
    input.lookups.materials,
  );

  await updateCaseDoctorApi(draft.id, {
    doctorName: input.data.doctor.fullName.trim(),
    doctorEmail: input.data.doctor.email.trim(),
    doctorPhone: doctorPhone(input.data),
    clinicName: input.data.doctor.clinicName.trim(),
    countryId: countryId ?? null,
  });

  await updateCaseDetailsApi(draft.id, {
    designTypeId,
    materialId: materialId ?? null,
    toothNumbers: toothNumbersFrom(input.data.caseDetails.toothNumbers),
    shade: input.data.caseDetails.shade || null,
    notes: caseNotes(input.data) ?? null,
  });

  await updateCaseSendMethodApi(draft.id, {
    sendMethod: files.length > 0 ? 'DIGITAL' : 'PHYSICAL',
    shippingAddress: input.data.doctor.address.trim() || null,
    shippingCity: input.data.doctor.city.trim() || null,
  });

  for (const file of files) {
    await uploadCaseFileApi(draft.id, file);
  }

  return submitCaseApi(draft.id);
}
