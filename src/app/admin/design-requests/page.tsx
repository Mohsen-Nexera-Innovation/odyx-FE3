'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  downloadDesignRequestFileApi,
  getDesignRequestApi,
  listDesignRequestsApi,
  updateDesignRequestStatusApi,
  type ApiDesignRequest,
  type DesignRequestStaffStatus,
} from '@/lib/api/design-requests';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';

const STATUS_LABEL: Record<DesignRequestStaffStatus, string> = {
  SUBMITTED: 'Submitted',
  IN_DESIGN: 'In design',
  DELIVERED: 'Delivered',
};

const STATUS_BADGE: Record<DesignRequestStaffStatus, string> = {
  SUBMITTED: 'admin-badge admin-badge--warn',
  IN_DESIGN: 'admin-badge admin-badge--sky',
  DELIVERED: 'admin-badge',
};

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminDesignRequestsPage() {
  const { session } = useAuthSession();
  const canRead = hasPermission(session, 'cases.read');
  const canManage = hasPermission(session, 'cases.manage');
  const [rows, setRows] = useState<ApiDesignRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ApiDesignRequest | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadList = async () => {
    setLoading(true);
    try {
      const list = await listDesignRequestsApi();
      setRows(list);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load design requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canRead) void loadList();
  }, [canRead]);

  useEffect(() => {
    if (!selectedId || !canRead) {
      setDetail(null);
      return;
    }
    void getDesignRequestApi(selectedId)
      .then((row) => {
        setDetail(row);
        setError('');
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to open request'));
  }, [selectedId, canRead]);

  const counts = useMemo(() => {
    const submitted = rows.filter((r) => r.status === 'SUBMITTED').length;
    const inDesign = rows.filter((r) => r.status === 'IN_DESIGN').length;
    const delivered = rows.filter((r) => r.status === 'DELIVERED').length;
    return { submitted, inDesign, delivered };
  }, [rows]);

  const onStatus = async (status: DesignRequestStaffStatus) => {
    if (!detail || !canManage || busy) return;
    setBusy(true);
    try {
      const updated = await updateDesignRequestStatusApi(detail.id, status);
      setDetail(updated);
      setRows((prev) => prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not update status');
    } finally {
      setBusy(false);
    }
  };

  const onDownload = async (fileId: string, name: string) => {
    if (!detail) return;
    setBusy(true);
    try {
      await downloadDesignRequestFileApi(detail.id, fileId, name);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Download failed');
    } finally {
      setBusy(false);
    }
  };

  if (!canRead) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Design requests</h1>
          <p className="admin-error">You need cases.read to view Design Services submissions.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Design requests</h1>
        <p className="admin-sub">
          Incoming work from the Design Services form. Not the public Case Library.
        </p>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-dr-stats" aria-label="Request summary">
        <div className="admin-chat-stat">
          <strong>{rows.length}</strong>
          <span>Total</span>
        </div>
        <div className="admin-chat-stat">
          <strong>{counts.submitted}</strong>
          <span>Submitted</span>
        </div>
        <div className="admin-chat-stat">
          <strong>{counts.inDesign}</strong>
          <span>In design</span>
        </div>
        <div className="admin-chat-stat">
          <strong>{counts.delivered}</strong>
          <span>Delivered</span>
        </div>
      </div>

      <div className="admin-dr-layout">
        <div className="admin-card">
          <div className="admin-card-head">
            <h2>Inbox</h2>
            <span className="admin-badge admin-badge--muted">
              {loading ? 'Loading…' : `${rows.length} requests`}
            </span>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Clinic / doctor</th>
                  <th>Design type</th>
                  <th>Teeth</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const status = row.status as DesignRequestStaffStatus;
                  return (
                    <tr
                      key={row.id}
                      className="admin-row-click"
                      data-active={selectedId === row.id ? 'true' : 'false'}
                      onClick={() => setSelectedId(row.id)}
                    >
                      <td>
                        <strong>{row.caseNumber}</strong>
                        {row.owner?.email ? (
                          <div className="admin-muted">{row.owner.email}</div>
                        ) : null}
                      </td>
                      <td>
                        {row.clinicName || '—'}
                        <div className="admin-muted">{row.doctorName || '—'}</div>
                      </td>
                      <td>{row.designType?.name || '—'}</td>
                      <td>{row.toothNumbers.length ? row.toothNumbers.join(', ') : '—'}</td>
                      <td>
                        <span className={STATUS_BADGE[status] ?? 'admin-badge admin-badge--muted'}>
                          {STATUS_LABEL[status] ?? row.status}
                        </span>
                      </td>
                      <td className="admin-muted">
                        {row.submittedAt
                          ? new Date(row.submittedAt).toLocaleString()
                          : new Date(row.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
                {!loading && rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="admin-empty">
                      No design requests yet. Submissions from /products/design-services appear here.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="admin-card admin-dr-detail">
          {!detail ? (
            <div className="admin-dr-empty">
              <h3>Pick a request</h3>
              <p className="admin-muted">
                Select a row to read doctor notes, download the scan, and update status.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-card-head">
                <h2>{detail.caseNumber}</h2>
                <span
                  className={
                    STATUS_BADGE[detail.status as DesignRequestStaffStatus] ??
                    'admin-badge admin-badge--muted'
                  }
                >
                  {STATUS_LABEL[detail.status as DesignRequestStaffStatus] ?? detail.status}
                </span>
              </div>

              <dl className="admin-dr-meta">
                <div>
                  <dt>Clinic</dt>
                  <dd>{detail.clinicName || '—'}</dd>
                </div>
                <div>
                  <dt>Doctor</dt>
                  <dd>
                    {detail.doctorName || '—'}
                    {detail.doctorEmail ? (
                      <span className="admin-muted"> · {detail.doctorEmail}</span>
                    ) : null}
                    {detail.doctorPhone ? (
                      <span className="admin-muted"> · {detail.doctorPhone}</span>
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt>Account</dt>
                  <dd>
                    {detail.owner?.name || '—'}
                    {detail.owner?.email ? (
                      <span className="admin-muted"> · {detail.owner.email}</span>
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt>Design type</dt>
                  <dd>{detail.designType?.name || '—'}</dd>
                </div>
                <div>
                  <dt>Material</dt>
                  <dd>{detail.material?.name || '—'}</dd>
                </div>
                <div>
                  <dt>Teeth</dt>
                  <dd>{detail.toothNumbers.length ? detail.toothNumbers.join(', ') : '—'}</dd>
                </div>
                <div>
                  <dt>Shade</dt>
                  <dd>{detail.shade || '—'}</dd>
                </div>
                <div>
                  <dt>Send method</dt>
                  <dd>
                    {detail.sendMethod === 'DIGITAL'
                      ? 'Digital'
                      : detail.sendMethod === 'PHYSICAL'
                        ? 'Physical'
                        : '—'}
                    {detail.shippingCity || detail.shippingAddress
                      ? ` · ${[detail.shippingCity, detail.shippingAddress].filter(Boolean).join(', ')}`
                      : ''}
                  </dd>
                </div>
                <div>
                  <dt>Country</dt>
                  <dd>{detail.country?.name || '—'}</dd>
                </div>
              </dl>

              {detail.notes ? (
                <div className="admin-dr-notes">
                  <h3>Notes</h3>
                  <p>{detail.notes}</p>
                </div>
              ) : null}

              <div className="admin-dr-files">
                <h3>Files</h3>
                {detail.files.length === 0 ? (
                  <p className="admin-muted">No files attached.</p>
                ) : (
                  <ul>
                    {detail.files.map((file) => (
                      <li key={file.id}>
                        <div>
                          <strong>{file.originalName}</strong>
                          <span className="admin-muted">
                            {formatBytes(file.sizeBytes)} · {file.mimeType || 'file'}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm"
                          disabled={busy}
                          onClick={() => void onDownload(file.id, file.originalName)}
                        >
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {canManage ? (
                <div className="admin-actions">
                  <button
                    type="button"
                    className="btn-ghost btn btn-sm"
                    disabled={busy || detail.status === 'SUBMITTED'}
                    onClick={() => void onStatus('SUBMITTED')}
                  >
                    Submitted
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    disabled={busy || detail.status === 'IN_DESIGN'}
                    onClick={() => void onStatus('IN_DESIGN')}
                  >
                    In design
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    disabled={busy || detail.status === 'DELIVERED'}
                    onClick={() => void onStatus('DELIVERED')}
                  >
                    Delivered
                  </button>
                </div>
              ) : (
                <p className="admin-muted">Status changes need cases.manage.</p>
              )}
            </>
          )}
        </aside>
      </div>
    </>
  );
}
