'use client';

import { useEffect, useState } from 'react';
import { listClientsApi, type ApiClientUser } from '@/lib/api/admin';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';
import { isApiMode } from '@/lib/config';

export default function AdminClientsPage() {
  const { session } = useAuthSession();
  const canRead = hasPermission(session, 'clients.read');
  const [clients, setClients] = useState<ApiClientUser[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!canRead || !isApiMode()) {
      if (!isApiMode()) setError('Clients require API mode.');
      return;
    }
    void listClientsApi()
      .then(setClients)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'));
  }, [canRead]);

  if (!canRead) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Clients</h1>
          <p className="admin-error">You need clients.read.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Clients</h1>
        <p className="admin-sub">Dentists, labs, and other buyers registered on Odyx.</p>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>Directory</h2>
          <span className="admin-badge admin-badge--muted">{clients.length} clients</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Org</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.name}</strong>
                  </td>
                  <td>{c.email}</td>
                  <td>
                    <span className="admin-badge admin-badge--sky">
                      {c.clientType || 'OTHER'}
                    </span>
                  </td>
                  <td>{c.org || '—'}</td>
                  <td className="admin-muted">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-empty">
                    No clients yet.
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
