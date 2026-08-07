import { Building2, UserRound } from 'lucide-react';
import type { DoctorInformation } from './types';

type DoctorInformationStepProps = {
  value: DoctorInformation;
  onChange: (value: DoctorInformation) => void;
};

export default function DoctorInformationStep({
  value,
  onChange,
}: DoctorInformationStepProps) {
  const update = (field: keyof DoctorInformation, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="case-form-card">
      <section className="case-form-section">
        <div className="case-form-section__title">
          <UserRound size={20} aria-hidden />
          <h2>Personal Information</h2>
        </div>
        <div className="case-field-grid">
          <label className="case-field">
            <span>Full Name <b>*</b></span>
            <input
              value={value.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </label>
          <label className="case-field">
            <span>Email Address <b>*</b></span>
            <input
              type="email"
              value={value.email}
              onChange={(event) => update('email', event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </label>
          <label className="case-field">
            <span>WhatsApp Number <b>*</b></span>
            <span className="case-phone">
              <select
                aria-label="Country calling code"
                value={value.countryCode}
                onChange={(event) => update('countryCode', event.target.value)}
              >
                <option>+20</option>
                <option>+966</option>
                <option>+971</option>
                <option>+962</option>
                <option>+1</option>
              </select>
              <input
                type="tel"
                aria-label="WhatsApp phone number"
                value={value.whatsapp}
                onChange={(event) => update('whatsapp', event.target.value)}
                placeholder="10 1234 5678"
                autoComplete="tel"
                required
              />
            </span>
          </label>
        </div>
      </section>

      <section className="case-form-section">
        <div className="case-form-section__title">
          <Building2 size={20} aria-hidden />
          <h2>Clinic Information</h2>
        </div>
        <div className="case-field-grid">
          <label className="case-field">
            <span>Clinic Name <b>*</b></span>
            <input
              value={value.clinicName}
              onChange={(event) => update('clinicName', event.target.value)}
              placeholder="Enter clinic name"
              autoComplete="organization"
              required
            />
          </label>
          <label className="case-field">
            <span>Country <b>*</b></span>
            <select
              value={value.country}
              onChange={(event) => update('country', event.target.value)}
              required
            >
              <option value="">Select your country</option>
              <option>Egypt</option>
              <option>Saudi Arabia</option>
              <option>United Arab Emirates</option>
              <option>Jordan</option>
              <option>United States</option>
            </select>
          </label>
          <label className="case-field">
            <span>City</span>
            <input
              value={value.city}
              onChange={(event) => update('city', event.target.value)}
              placeholder="Enter city"
              autoComplete="address-level2"
            />
          </label>
          <label className="case-field case-field--wide">
            <span>Address <small>(Optional)</small></span>
            <textarea
              rows={2}
              value={value.address}
              onChange={(event) => update('address', event.target.value)}
              placeholder="Enter clinic address"
              autoComplete="street-address"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
