import {
  ROI_CURING,
  ROI_PRINTER,
  ROI_SCANNER,
  type RoiScope,
} from '@/content/roi';

export type RoiInputs = {
  scope: RoiScope;
  monthlyCrowns: number;
  labFeePerCrown: number;
  resinCostPerCrown: number;
  visitsSavedPerCrown: number;
  costPerAvoidedVisit: number;
  patientFeePerCrown: number;
  includeScanner: boolean;
  includePrinter: boolean;
  includeCuring: boolean;
  /** When set, overrides selected bundle total */
  investmentOverride: number | null;
};

export type RoiResults = {
  investment: number;
  scannerPrice: number;
  printerPrice: number;
  curingPrice: number;
  labFeeSavingsMonthly: number;
  visitMaterialSavingsMonthly: number;
  monthlySavings: number;
  monthlyLabSpend: number;
  monthlyInHouseSpend: number;
  monthlyRevenue: number;
  profitAnalogMonthly: number;
  profitDigitalMonthly: number;
  paybackMonths: number | null;
  savings12: number;
  savings36: number;
  costPerCrownOutsourced: number;
  costPerCrownInHouse: number;
};

function clampNonNeg(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export function calcBundleInvestment(inputs: {
  scope: RoiScope;
  includeScanner: boolean;
  includePrinter: boolean;
  includeCuring: boolean;
}): number {
  if (inputs.scope === 'printer') {
    return (
      ROI_PRINTER.price + (inputs.includeCuring ? ROI_CURING.price : 0)
    );
  }
  return (
    (inputs.includeScanner ? ROI_SCANNER.price : 0) +
    (inputs.includePrinter ? ROI_PRINTER.price : 0) +
    (inputs.includeCuring ? ROI_CURING.price : 0)
  );
}

/**
 * Dentist crown ROI shared by printer-only and full-ecosystem scopes.
 * Savings math is the same; investment differs by selected products.
 */
export function calculateRoi(inputs: RoiInputs): RoiResults {
  const monthlyCrowns = clampNonNeg(inputs.monthlyCrowns);
  const labFeePerCrown = clampNonNeg(inputs.labFeePerCrown);
  const resinCostPerCrown = clampNonNeg(inputs.resinCostPerCrown);
  const visitsSavedPerCrown = clampNonNeg(inputs.visitsSavedPerCrown);
  const costPerAvoidedVisit = clampNonNeg(inputs.costPerAvoidedVisit);
  const patientFeePerCrown = clampNonNeg(inputs.patientFeePerCrown);

  const includeScanner =
    inputs.scope === 'ecosystem' ? inputs.includeScanner : false;
  const includePrinter =
    inputs.scope === 'ecosystem' ? inputs.includePrinter : true;
  const includeCuring = inputs.includeCuring;

  const scannerPrice = includeScanner ? ROI_SCANNER.price : 0;
  const printerPrice = includePrinter ? ROI_PRINTER.price : 0;
  const curingPrice = includeCuring ? ROI_CURING.price : 0;
  const bundleTotal = scannerPrice + printerPrice + curingPrice;

  const investment =
    inputs.investmentOverride != null && Number.isFinite(inputs.investmentOverride)
      ? clampNonNeg(inputs.investmentOverride)
      : bundleTotal;

  const labFeeSavingsMonthly =
    Math.max(0, labFeePerCrown - resinCostPerCrown) * monthlyCrowns;
  const visitMaterialSavingsMonthly =
    visitsSavedPerCrown * costPerAvoidedVisit * monthlyCrowns;
  const monthlySavings = labFeeSavingsMonthly + visitMaterialSavingsMonthly;

  const monthlyLabSpend = labFeePerCrown * monthlyCrowns;
  const monthlyInHouseSpend = resinCostPerCrown * monthlyCrowns;
  const monthlyRevenue = patientFeePerCrown * monthlyCrowns;
  const profitAnalogMonthly =
    (patientFeePerCrown - labFeePerCrown) * monthlyCrowns;
  const profitDigitalMonthly =
    (patientFeePerCrown - resinCostPerCrown) * monthlyCrowns +
    visitMaterialSavingsMonthly;

  const paybackMonths =
    monthlySavings > 0 ? investment / monthlySavings : null;

  return {
    investment,
    scannerPrice,
    printerPrice,
    curingPrice,
    labFeeSavingsMonthly,
    visitMaterialSavingsMonthly,
    monthlySavings,
    monthlyLabSpend,
    monthlyInHouseSpend,
    monthlyRevenue,
    profitAnalogMonthly,
    profitDigitalMonthly,
    paybackMonths,
    savings12: monthlySavings * 12,
    savings36: monthlySavings * 36,
    costPerCrownOutsourced: labFeePerCrown,
    costPerCrownInHouse: resinCostPerCrown,
  };
}

export function scenarioSnapshot(inputs: RoiInputs, results: RoiResults) {
  return {
    scope: inputs.scope,
    product:
      inputs.scope === 'ecosystem' ? 'odyx-ecosystem' : 'odyx-p1-26',
    focus:
      inputs.scope === 'ecosystem' ? 'full-ecosystem' : 'printer-crowns',
    monthlyCrowns: inputs.monthlyCrowns,
    labFeePerCrown: inputs.labFeePerCrown,
    resinCostPerCrown: inputs.resinCostPerCrown,
    visitsSavedPerCrown: inputs.visitsSavedPerCrown,
    costPerAvoidedVisit: inputs.costPerAvoidedVisit,
    patientFeePerCrown: inputs.patientFeePerCrown,
    includeScanner: inputs.includeScanner,
    includePrinter: inputs.includePrinter,
    includeCuring: inputs.includeCuring,
    investmentOverride: inputs.investmentOverride,
    results: {
      investment: results.investment,
      labFeeSavingsMonthly: results.labFeeSavingsMonthly,
      visitMaterialSavingsMonthly: results.visitMaterialSavingsMonthly,
      monthlySavings: results.monthlySavings,
      paybackMonths: results.paybackMonths,
      savings12: results.savings12,
      savings36: results.savings36,
      monthlyLabSpend: results.monthlyLabSpend,
      monthlyInHouseSpend: results.monthlyInHouseSpend,
      monthlyRevenue: results.monthlyRevenue,
      profitAnalogMonthly: results.profitAnalogMonthly,
      profitDigitalMonthly: results.profitDigitalMonthly,
    },
  };
}
