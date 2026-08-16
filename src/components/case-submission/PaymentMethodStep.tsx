import { Building2, CreditCard, Lock, ShieldCheck, Wallet } from 'lucide-react';
import type { PaymentMethod } from './types';

type PaymentMethodStepProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  errors?: Record<string, string>;
};

const METHODS = [
  {
    id: 'bank_transfer' as const,
    title: 'Bank Transfer',
    description: 'Transfer to ODYX after we send the final quote and account details.',
    detail: 'InstaPay · Bank wire',
    icon: Building2,
    enabled: true,
    accent: {
      border: 'border-[#0050D8] bg-[#F3F7FF] shadow-[0_0_0_1px_#0050D8]',
      icon: 'text-[#0050D8] bg-[#E8EFFC]',
      badge: 'bg-[#0050D8] text-white',
      badgeLabel: 'Recommended',
    },
  },
  {
    id: 'online' as const,
    title: 'Online Payment',
    description: 'Pay securely by card once your case quote is confirmed.',
    detail: 'Visa · Mastercard · Meeza',
    icon: CreditCard,
    enabled: false,
    accent: {
      border: 'border-[#0050D8] bg-[#F3F7FF] shadow-[0_0_0_1px_#0050D8]',
      icon: 'text-[#0050D8] bg-[#E8EFFC]',
      badge: 'bg-[#0050D8] text-white',
      badgeLabel: 'Coming soon',
    },
  },
  {
    id: 'cash' as const,
    title: 'Cash on Delivery',
    description: 'Pay in cash when your finished case is delivered to the clinic.',
    detail: 'Receipt provided on delivery',
    icon: Wallet,
    enabled: false,
    accent: {
      border: 'border-[#16A34A] bg-[#F0FDF4] shadow-[0_0_0_1px_#16A34A]',
      icon: 'text-[#16A34A] bg-[#DCFCE7]',
      badge: 'bg-[#16A34A] text-white',
      badgeLabel: 'Coming soon',
    },
  },
] as const;

export default function PaymentMethodStep({ value, onChange, errors = {} }: PaymentMethodStepProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
        role="radiogroup"
        aria-label="Payment method"
        aria-invalid={Boolean(errors.paymentMethod) || undefined}
      >
        {METHODS.map(({ id, title, description, detail, icon: Icon, accent, enabled }) => {
          const selected = value === id;
          return (
            <label
              key={id}
              aria-disabled={!enabled}
              className={`relative min-w-0 min-h-[44px] p-4 sm:p-5 border-[1.5px] rounded-[8px] flex flex-row md:flex-col items-start gap-3.5 md:gap-0 transition-all duration-150 bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] ${
                !enabled
                  ? 'cursor-not-allowed opacity-50 border-[#E5E7EB] bg-[#F9FAFB]'
                  : selected
                  ? `${accent.border} cursor-pointer`
                  : 'border-[#E5E7EB] hover:border-[#C5CDD8] hover:bg-[#F7F9FB] cursor-pointer'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                className="sr-only"
                checked={selected}
                disabled={!enabled}
                onChange={() => {
                  if (enabled) onChange(id);
                }}
              />

              <span
                aria-hidden
                className={`w-11 h-11 flex-shrink-0 rounded-[10px] flex items-center justify-center transition-colors md:mb-4 ${
                  !enabled
                    ? 'bg-[#F3F4F6] text-[#9CA3AF]'
                    : selected
                    ? accent.icon
                    : 'bg-[#F3F7FF] text-[#0050D8]'
                }`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </span>

              <div className="min-w-0 flex-1 flex flex-col md:h-full">
                <div className="flex items-start justify-between gap-2 mb-1 md:mb-2">
                  <h2 className="text-[15px] sm:text-[16px] font-bold text-[#0A1020] m-0 leading-snug">
                    {title}
                  </h2>
                  <span
                    className={`flex-shrink-0 text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[4px] whitespace-nowrap ${
                      !enabled
                        ? 'bg-[#F3F4F6] text-[#9CA3AF]'
                        : selected
                        ? accent.badge
                        : 'bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {accent.badgeLabel}
                  </span>
                </div>

                <p className="text-[12.5px] sm:text-[13px] font-medium text-[#6B7280] leading-relaxed m-0 md:flex-1">
                  {description}
                </p>

                <p
                  className={`text-[11.5px] sm:text-[12px] font-semibold m-0 mt-2.5 md:mt-4 pt-2.5 md:pt-3 border-t border-[#E5E7EB] ${
                    selected && enabled ? 'text-[#0A1020]' : 'text-[#6B7280]'
                  }`}
                >
                  {detail}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {errors.paymentMethod && (
        <p className="text-[#EF4444] text-[13px] font-medium m-0" role="alert">
          {errors.paymentMethod}
        </p>
      )}

      <div className="border border-[#E5E7EB] rounded-[8px] bg-[#F8FAFC] shadow-[0_0_12px_rgba(0,0,0,0.04)] px-4 py-3.5 sm:px-5 sm:py-4 flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4 lg:gap-8 min-w-0">
        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
          <Lock size={18} strokeWidth={2} aria-hidden className="text-[#0050D8] flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[12.5px] sm:text-[13px] font-medium m-0 min-w-0">
            <span className="font-bold text-[#0A1020]">No charge yet.</span>{' '}
            <span className="text-[#6B7280]">Final amount is confirmed after case review.</span>
          </p>
        </div>
        <div className="hidden lg:block w-px h-8 bg-[#E5E7EB] flex-shrink-0" aria-hidden />
        <div className="flex items-start sm:items-center gap-2.5 min-w-0 lg:border-0 border-t border-[#E5E7EB] lg:pt-0 pt-3">
          <ShieldCheck size={18} strokeWidth={2} aria-hidden className="text-[#16A34A] flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[12.5px] sm:text-[13px] font-medium m-0 text-[#6B7280] min-w-0">
            Payments processed securely. Card details never stored on ODYX.
          </p>
        </div>
      </div>
    </div>
  );
}
