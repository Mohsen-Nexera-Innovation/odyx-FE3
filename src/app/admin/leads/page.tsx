'use client';

import { useEffect, useState } from 'react';
import { listLeadsApi, type ApiLead } from '@/lib/api/leads';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';
import { isApiMode } from '@/lib/config';
import { formatMoney } from '@/content/shop';

function scenarioSummary(lead: ApiLead): string {
  const scenario = lead.scenario;
  if (!scenario || typeof scenario !== 'object') return '—';
  const s = scenario as {
    mode?: string;
    focus?: string;
    product?: string;
    results?: Record<string, unknown>;
  };
  const results = s.results;
  const monthly = results?.monthlySavings;
  const payback = results?.paybackMonths;
  const parts: string[] = [];
  if (s.focus === 'full-ecosystem' || s.product === 'odyx-ecosystem') {
    parts.push('Ecosystem');
  } else if (s.focus === 'printer-crowns' || s.product === 'odyx-p1-26') {
    parts.push('P1-26');
  } else if (s.mode) {
    parts.push(String(s.mode));
  }
  if (typeof monthly === 'number') {
    parts.push(`${formatMoney(monthly, 'EGP')}/mo`);
  }
  if (typeof payback === 'number' && Number.isFinite(payback)) {
    parts.push(`${payback.toFixed(1)} mo payback`);
  }
  return parts.length ? parts.join(' · ') : '—';
}

export default function AdminLeadsPage() {
  const { session } = useAuthSession();
  const canRead = hasPermission(session, 'leads.read');
  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!canRead || !isApiMode()) {
      if (!isApiMode()) setError('Leads require API mode.');
      return;
    }
    void listLeadsApi()
      .then(setLeads)
      .catch((e) =>
        setError(e instanceof Error ? e.message : 'Failed to load'),
      );
  }, [canRead]);

  if (!canRead) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Leads</h1>
          <p className="admin-error">You need leads.read.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Leads</h1>
        <p className="admin-sub">
          ROI calculator submissions and marketing follow-ups.
        </p>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>Inbox</h2>
          <span className="admin-badge admin-badge--muted">
            {leads.length} leads
          </span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Org</th>
                <th>Scenario</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <strong>{lead.name}</strong>
                    {lead.phone ? (
                      <div className="admin-muted">{lead.phone}</div>
                    ) : null}
                  </td>
                  <td>{lead.email}</td>
                  <td>
                    <span className="admin-badge admin-badge--sky">
                      {lead.clientType}
                    </span>
                  </td>
                  <td>{lead.org || '—'}</td>
                  <td className="admin-muted">{scenarioSummary(lead)}</td>
                  <td>
                    <span className="admin-badge admin-badge--muted">
                      {lead.status}
                    </span>
                  </td>
                  <td className="admin-muted">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="admin-empty">
                    No leads yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
