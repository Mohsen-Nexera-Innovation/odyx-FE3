import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export function NeedHelp() {
  return (
    <aside className="case-help case-side-card" aria-label="Contact support">
      <h2>Need Help?</h2>
      <p>Our team is here to help you with your case.</p>
      <a className="case-contact-button case-contact-button--whatsapp" href="https://wa.me/">
        <MessageCircle size={16} aria-hidden />
        Chat on WhatsApp
      </a>
      <a className="case-contact-button" href="mailto:support@odyx.com">
        <Mail size={16} aria-hidden />
        Email Us
      </a>
    </aside>
  );
}

export function SecureConfidential() {
  return (
    <aside className="case-secure case-side-card">
      <ShieldCheck size={22} aria-hidden />
      <div>
        <h2>Secure &amp; Confidential</h2>
        <p>Your data is 100% secure and will never be shared.</p>
      </div>
    </aside>
  );
}
