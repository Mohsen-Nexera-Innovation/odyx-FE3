'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  inviteStaffApi,
  listRolesApi,
  listStaffApi,
  updateStaffApi,
  type ApiRole,
  type ApiStaffUser,
} from '@/lib/api/admin';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';
import { isApiMode } from '@/lib/config';

export default function AdminUsersPage() {
  const { session } = useAuthSession();
  const canInvite = hasPermission(session, 'users.invite');
  const [staff, setStaff] = useState<ApiStaffUser[]>([]);
  const [roles, setRoles] = useState<ApiRole[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [inviteToken, setInviteToken] = useState('');
  const [formError, setFormError] = useState('');
  const [formOk, setFormOk] = useState('');
  const [reinviteError, setReinviteError] = useState('');
  const [reinviteOk, setReinviteOk] = useState('');
  const [reinviteToken, setReinviteToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [reinvitingId, setReinvitingId] = useState('');

  const load = async () => {
    if (!isApiMode()) {
      setFormError('Staff management requires API mode.');
      return;
    }
    try {
      const [s, r] = await Promise.all([listStaffApi(), listRolesApi()]);
      setStaff(s);
      setRoles(r);
      if (!roleId && r[0]) setRoleId(r[0].id);
      setFormError('');
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Failed to load staff');
    }
  };

  useEffect(() => {
    if (canInvite) void load();
  }, [canInvite]);

  const inviteMessage = (res: { email: string; emailSent: boolean }) =>
    res.emailSent
      ? `Invite email sent to ${res.email}.`
      : `Invite created for ${res.email}. Email not sent yet (SMTP not configured) — share the accept link below.`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setFormError('');
    setFormOk('');
    setInviteToken('');
    setReinviteError('');
    setReinviteOk('');
    setReinviteToken('');
    try {
      const res = await inviteStaffApi({
        email: email.trim(),
        roleId,
        name: name.trim() || undefined,
      });
      setFormOk(inviteMessage(res));
      setInviteToken(res.inviteToken);
      setEmail('');
      setName('');
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Invite failed');
    } finally {
      setBusy(false);
    }
  };

  const reinviteUser = async (user: ApiStaffUser) => {
    const nextRoleId = user.roleId || roleId || roles[0]?.id;
    if (!nextRoleId) {
      setReinviteError('Assign a role before re-inviting.');
      return;
    }
    setReinvitingId(user.id);
    setReinviteError('');
    setReinviteOk('');
    setReinviteToken('');
    try {
      const res = await inviteStaffApi({
        email: user.email,
        roleId: nextRoleId,
        name: user.name || undefined,
      });
      setReinviteOk(inviteMessage(res));
      setReinviteToken(res.inviteToken);
      await load();
    } catch (err) {
      setReinviteError(err instanceof Error ? err.message : 'Re-invite failed');
    } finally {
      setReinvitingId('');
    }
  };

  const disableUser = async (user: ApiStaffUser) => {
    if (user.staffRank === 'OWNER' || user.staffRank === 'SUPER_ADMIN') return;
    try {
      await updateStaffApi(user.id, { status: 'DISABLED' });
      await load();
    } catch (err) {
      setReinviteError(err instanceof Error ? err.message : 'Update failed');
    }
  };

  if (!canInvite) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Staff</h1>
          <p className="admin-error">You need users.invite to manage staff.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Staff</h1>
        <p className="admin-sub">Invite Odyx teammates and assign a dynamic role.</p>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2>Invite staff</h2>
        </div>
        <form className="admin-form" onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Name (optional)
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Role
            <select value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-sm" disabled={busy || !roleId}>
            {busy ? 'Inviting…' : 'Send invite'}
          </button>
        </form>
        {formError ? <p className="admin-error">{formError}</p> : null}
        {formOk ? <p className="admin-ok">{formOk}</p> : null}
        {inviteToken ? (
          <p className="admin-muted">
            Accept URL
            <code className="admin-code">/accept-invite?token={inviteToken}</code>
          </p>
        ) : null}
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2>Team</h2>
          <span className="admin-badge admin-badge--muted">{staff.length} members</span>
        </div>
        {reinviteError ? <p className="admin-error">{reinviteError}</p> : null}
        {reinviteOk ? <p className="admin-ok">{reinviteOk}</p> : null}
        {reinviteToken ? (
          <p className="admin-muted">
            Accept URL
            <code className="admin-code">/accept-invite?token={reinviteToken}</code>
          </p>
        ) : null}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Rank / role</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {staff.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.name}</strong>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    {u.staffRank === 'OWNER' || u.staffRank === 'SUPER_ADMIN' ? (
                      <span className="admin-badge">Full access</span>
                    ) : (
                      <span className="admin-badge admin-badge--sky">
                        {u.roleName || 'No role'}
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={
                        u.status === 'ACTIVE'
                          ? 'admin-badge'
                          : u.status === 'INVITED'
                            ? 'admin-badge admin-badge--warn'
                            : 'admin-badge admin-badge--muted'
                      }
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      {u.staffRank === 'STAFF' && u.status === 'INVITED' ? (
                        <button
                          type="button"
                          className="btn btn-sm"
                          disabled={Boolean(reinvitingId) || busy}
                          onClick={() => void reinviteUser(u)}
                        >
                          {reinvitingId === u.id ? 'Re-inviting…' : 'Re-invite'}
                        </button>
                      ) : null}
                      {u.staffRank === 'STAFF' && u.status === 'ACTIVE' ? (
                        <button
                          type="button"
                          className="btn-ghost btn btn-sm"
                          onClick={() => void disableUser(u)}
                        >
                          Disable
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
              {staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-empty">
                    No staff yet. Send an invite to get started.
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
