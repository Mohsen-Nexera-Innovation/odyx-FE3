'use client';

export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
}: {
  value: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  return (
    <div className="qty-stepper" role="group" aria-label={label ?? 'Quantity'}>
      <button
        type="button"
        className="qty-btn"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="qty-val" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="qty-btn"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
