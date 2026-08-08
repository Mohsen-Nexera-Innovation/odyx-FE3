/**
 * Local mock data for the Support section (/support, /support/manuals,
 * /support/downloads, /support/faqs, /support/warranty).
 *
 * Structured so every list can later be swapped for an API response —
 * each shape below is what the matching endpoint would be expected to return.
 */

export type SupportProductId = 's1-scanner' | 'p1-26-printer' | 'cure-unit' | 'resin-materials';

export interface SupportProduct {
  id: SupportProductId;
  name: string;
  image: string;
}

export const SUPPORT_PRODUCTS: SupportProduct[] = [
  { id: 's1-scanner', name: 'ODYX S1 Scanner', image: '/img/cutouts/feat-scanner-cutout.png' },
  { id: 'p1-26-printer', name: 'ODYX P1-26 3D Printer', image: '/img/cutouts/feat-printer-cutout.png' },
  { id: 'cure-unit', name: 'ODYX Cure UV Curing Unit', image: '/img/cutouts/feat-curing-cutout.png' },
  { id: 'resin-materials', name: 'ODYX Resin Materials', image: '/img/resins/all-resins-cutout.png' },
];

export interface ProductQuickLink {
  label: string;
  href: string;
}

export const PRODUCT_QUICK_LINKS: Record<SupportProductId, ProductQuickLink[]> = {
  's1-scanner': [
    { label: 'Manuals', href: '/support/manuals?product=s1-scanner' },
    { label: 'Downloads', href: '/support/downloads?product=s1-scanner' },
    { label: 'Calibration', href: '/support/manuals?category=calibration-guides&product=s1-scanner' },
    { label: 'FAQs', href: '/support/faqs?category=scanner' },
  ],
  'p1-26-printer': [
    { label: 'Manuals', href: '/support/manuals?product=p1-26-printer' },
    { label: 'Downloads', href: '/support/downloads?product=p1-26-printer' },
    { label: 'Maintenance', href: '/support/manuals?category=maintenance-guides&product=p1-26-printer' },
    { label: 'FAQs', href: '/support/faqs?category=printer' },
  ],
  'cure-unit': [
    { label: 'Manuals', href: '/support/manuals?product=cure-unit' },
    { label: 'Downloads', href: '/support/downloads?product=cure-unit' },
    { label: 'Safety Guides', href: '/support/manuals?category=safety-guides&product=cure-unit' },
    { label: 'FAQs', href: '/support/faqs?category=cure' },
  ],
  'resin-materials': [
    { label: 'Data Sheets', href: '/support/manuals?product=resin-materials' },
    { label: 'SDS (Safety)', href: '/support/downloads?product=resin-materials' },
    { label: 'Printing Params', href: '/support/manuals?category=other-documents&product=resin-materials' },
    { label: 'FAQs', href: '/support/faqs?category=resin' },
  ],
};

export interface StatusCardData {
  id: string;
  label: string;
  value: string;
  href: string;
  linkLabel: string;
  tone: 'ok' | 'neutral';
}

export const STATUS_CARDS: StatusCardData[] = [
  { id: 'system-status', label: 'System Status', value: 'All Systems Operational', href: '/support', linkLabel: '', tone: 'ok' },
  { id: 'latest-software', label: 'Latest Software', value: 'ODYX Base 1.2.3', href: '/support/downloads', linkLabel: 'View details', tone: 'neutral' },
  { id: 'latest-firmware', label: 'Latest Firmware', value: 'P1-26 v3.10', href: '/support/downloads', linkLabel: "What's new", tone: 'neutral' },
  { id: 'last-update', label: 'Last Update', value: 'May 12, 2026', href: '/support/downloads', linkLabel: '', tone: 'neutral' },
];

export type ManualCategoryId =
  | 'user-manuals'
  | 'quick-start-guides'
  | 'installation-guides'
  | 'maintenance-guides'
  | 'calibration-guides'
  | 'safety-guides'
  | 'other-documents';

export interface ManualCategory {
  id: ManualCategoryId;
  label: string;
}

export const MANUAL_CATEGORIES: ManualCategory[] = [
  { id: 'user-manuals', label: 'User Manuals' },
  { id: 'quick-start-guides', label: 'Quick Start Guides' },
  { id: 'installation-guides', label: 'Installation Guides' },
  { id: 'maintenance-guides', label: 'Maintenance Guides' },
  { id: 'calibration-guides', label: 'Calibration Guides' },
  { id: 'safety-guides', label: 'Safety Guides' },
  { id: 'other-documents', label: 'Other Documents' },
];

export interface ManualEntry {
  id: string;
  title: string;
  description: string;
  category: ManualCategoryId;
  product: SupportProductId;
  fileType: 'PDF';
  size: string;
  date: string;
  previewHref: string;
  downloadHref: string;
}

export const MANUALS: ManualEntry[] = [
  { id: 'm-1', title: 'ODYX S1 User Manual', description: 'Complete user guide for the ODYX S1 intraoral scanner.', category: 'user-manuals', product: 's1-scanner', fileType: 'PDF', size: '4.2MB', date: 'May 15, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-2', title: 'ODYX S1 Quick Start Guide', description: 'Get started with your ODYX S1 scanner in minutes.', category: 'quick-start-guides', product: 's1-scanner', fileType: 'PDF', size: '1.8MB', date: 'May 10, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-3', title: 'ODYX S1 Installation Guide', description: 'Step-by-step installation and setup instructions.', category: 'installation-guides', product: 's1-scanner', fileType: 'PDF', size: '2.5MB', date: 'May 8, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-4', title: 'ODYX S1 Maintenance Guide', description: 'Routine care and maintenance for optimal scanner performance.', category: 'maintenance-guides', product: 's1-scanner', fileType: 'PDF', size: '2.1MB', date: 'May 6, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-5', title: 'ODYX S1 Calibration Guide', description: 'How to calibrate your scanner for maximum accuracy.', category: 'calibration-guides', product: 's1-scanner', fileType: 'PDF', size: '1.4MB', date: 'May 4, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-6', title: 'P1-26 Printer User Manual', description: 'Complete user guide for the ODYX P1-26 3D printer.', category: 'user-manuals', product: 'p1-26-printer', fileType: 'PDF', size: '5.1MB', date: 'May 9, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-7', title: 'P1-26 Installation Guide', description: 'Unboxing, setup and initial installation and instructions.', category: 'installation-guides', product: 'p1-26-printer', fileType: 'PDF', size: '3.0MB', date: 'May 7, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-8', title: 'ODYX Cure User Manual', description: 'Complete user guide for the ODYX Cure UV curing unit.', category: 'user-manuals', product: 'cure-unit', fileType: 'PDF', size: '3.1MB', date: 'May 7, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-9', title: 'ODYX Cure Quick Start Guide', description: 'Get your curing unit running in under five minutes.', category: 'quick-start-guides', product: 'cure-unit', fileType: 'PDF', size: '1.2MB', date: 'May 5, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-10', title: 'ODYX Cure Safety Guide', description: 'Important safety information for UV curing operation.', category: 'safety-guides', product: 'cure-unit', fileType: 'PDF', size: '0.9MB', date: 'May 3, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-11', title: 'Resin Materials Data Sheet', description: 'Technical data sheets for all ODYX resin lines.', category: 'other-documents', product: 'resin-materials', fileType: 'PDF', size: '2.7MB', date: 'May 2, 2026', previewHref: '#', downloadHref: '#' },
  { id: 'm-12', title: 'Resin Materials Safety (SDS)', description: 'Safety data sheets for handling and storage.', category: 'safety-guides', product: 'resin-materials', fileType: 'PDF', size: '1.6MB', date: 'Apr 30, 2026', previewHref: '#', downloadHref: '#' },
];

export type DownloadCategoryId = 'software' | 'firmware' | 'drivers' | 'release-notes';

export interface DownloadCategory {
  id: DownloadCategoryId;
  label: string;
}

export const DOWNLOAD_CATEGORIES: DownloadCategory[] = [
  { id: 'software', label: 'Software' },
  { id: 'firmware', label: 'Firmware' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'release-notes', label: 'Release Notes' },
];

export interface DownloadEntry {
  id: string;
  name: string;
  description: string;
  category: DownloadCategoryId;
  version: string;
  date: string;
  size: string;
  downloadHref: string;
}

export const DOWNLOADS: DownloadEntry[] = [
  { id: 'd-1', name: 'ODYX Box - Scanning Software', description: 'Desktop scanning application for the ODYX S1.', category: 'software', version: '1.2.3', date: 'May 12, 2026', size: '57.2MB', downloadHref: '#' },
  { id: 'd-2', name: 'S1 Scanner Firmware', description: 'Latest firmware update for the ODYX S1 intraoral scanner.', category: 'firmware', version: '2.1.0', date: 'May 10, 2026', size: '18.5MB', downloadHref: '#' },
  { id: 'd-3', name: 'ODYX Design Application', description: 'CAD design software for restorations and appliances.', category: 'software', version: '1.0.4', date: 'May 8, 2026', size: '112.0MB', downloadHref: '#' },
  { id: 'd-4', name: 'P1-26 Printer Firmware', description: 'Firmware update for the ODYX P1-26 3D printer.', category: 'firmware', version: '3.1.0', date: 'May 6, 2026', size: '22.4MB', downloadHref: '#' },
  { id: 'd-5', name: 'USB Driver (Windows)', description: 'Windows USB driver for scanner connectivity.', category: 'drivers', version: '1.0.2', date: 'May 3, 2026', size: '3.2MB', downloadHref: '#' },
  { id: 'd-6', name: 'USB Driver (macOS)', description: 'macOS USB driver for scanner connectivity.', category: 'drivers', version: '1.0.2', date: 'May 3, 2026', size: '2.9MB', downloadHref: '#' },
  { id: 'd-7', name: 'Release Notes - May 2026', description: 'What changed across the ODYX software and firmware.', category: 'release-notes', version: '-', date: 'May 12, 2026', size: '1.2MB', downloadHref: '#' },
];

export type FaqCategoryId = 'scanner' | 'printer' | 'cure' | 'resin' | 'software' | 'warranty' | 'orders' | 'installation';

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
  count: number;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: 'scanner', label: 'Scanner', count: 12 },
  { id: 'printer', label: 'Printer', count: 10 },
  { id: 'cure', label: 'Cure', count: 9 },
  { id: 'resin', label: 'Resin', count: 7 },
  { id: 'software', label: 'Software', count: 6 },
  { id: 'warranty', label: 'Warranty', count: 5 },
  { id: 'orders', label: 'Orders', count: 8 },
  { id: 'installation', label: 'Installation', count: 8 },
];

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: FaqCategoryId;
}

export const FAQS: FaqEntry[] = [
  { id: 'f-1', question: 'How do I calibrate my scanner?', answer: 'Open ODYX Box, go to Settings › Calibration, and follow the on-screen guide with the supplied calibration target. Recalibrate every 3 months or after a firmware update.', category: 'scanner' },
  { id: 'f-2', question: 'What file formats are supported?', answer: 'The ODYX S1 exports STL and PLY files. ODYX Design imports STL, PLY, and OBJ, and exports print-ready STL files for the P1-26.', category: 'software' },
  { id: 'f-3', question: 'How often should I update the software?', answer: 'We recommend installing updates as soon as they are available. Check Settings › Updates, or subscribe to release notes from the Downloads page.', category: 'software' },
  { id: 'f-4', question: 'How can I improve scan accuracy?', answer: 'Ensure the tip is clean and dry, keep a steady scanning distance of 0–5mm, and recalibrate the scanner if accuracy drifts over time.', category: 'scanner' },
  { id: 'f-5', question: 'Why is my scanner not detected?', answer: 'Reconnect the USB-C cable, try a different port, reinstall the USB driver from the Downloads page, and confirm ODYX Box has camera and USB permissions.', category: 'scanner' },
  { id: 'f-6', question: 'How do I clean the printing tip?', answer: 'Use isopropyl alcohol (IPA) with a lint-free wipe after every case. Never use abrasive materials, and let the tip dry fully before the next scan.', category: 'scanner' },
  { id: 'f-7', question: 'What resin is best for crowns and bridges?', answer: 'Use the ODYX Crown & Bridge resin line — it is validated for the P1-26 profile and certified for permanent restorations.', category: 'resin' },
  { id: 'f-8', question: 'How long does a curing cycle take?', answer: 'Standard cycles run 8–12 minutes depending on the resin line and part geometry. ODYX Cure automatically selects the validated profile.', category: 'cure' },
  { id: 'f-9', question: 'My print failed halfway through — what should I check?', answer: 'Check the resin vat level, confirm the build plate is level and clean, and verify the print profile matches the resin line loaded.', category: 'printer' },
  { id: 'f-10', question: 'How do I track my order?', answer: 'Sign in to your account and open Orders to see live status, or use the tracking link sent to your email after dispatch.', category: 'orders' },
  { id: 'f-11', question: 'Can I install the P1-26 myself?', answer: 'Yes — follow the Installation Guide on the Manuals page. Most clinics are fully set up within 30 minutes.', category: 'installation' },
  { id: 'f-12', question: 'What does the warranty cover?', answer: 'Manufacturing defects, hardware repair and replacement, and software updates. See the Warranty page for full coverage details.', category: 'warranty' },
];

export interface WarrantyCoverageItem {
  label: string;
}

export const WARRANTY_COVERED: WarrantyCoverageItem[] = [
  { label: 'Manufacturing defects' },
  { label: 'Hardware repair and replacement' },
  { label: 'Software updates' },
  { label: 'Technical support access' },
];

export const WARRANTY_NOT_COVERED: WarrantyCoverageItem[] = [
  { label: 'Physical damage from misuse' },
  { label: 'Water damage' },
  { label: 'Unauthorized repairs' },
  { label: 'Normal wear and tear' },
];

export interface WarrantyPeriodEntry {
  product: string;
  period: string;
}

export const WARRANTY_PERIODS: WarrantyPeriodEntry[] = [
  { product: 'ODYX S1 Scanner', period: '18 Months' },
  { product: 'ODYX P1-26 3D Printer', period: '12 Months' },
  { product: 'ODYX Cure UV Curing Unit', period: '12 Months' },
  { product: 'ODYX Resin Materials', period: '6 Months' },
];

export const WARRANTY_CLAIM_PRODUCT_OPTIONS = SUPPORT_PRODUCTS.map((p) => p.name);
