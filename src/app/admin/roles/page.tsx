'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  createRoleApi,
  listPermissionsApi,
  listRolesApi,
  updateRoleApi,
  type ApiPermission,
  type ApiRole,
} from '@/lib/api/admin';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';
import { isApiMode } from '@/lib/config';

export default function AdminRolesPage() {
  const { session } = useAuthSession();
  const canManage = hasPermission(session, 'roles.manage');
  const [roles, setRoles] = useState<ApiRole[]>([]);
  const [permissions, setPermissions] = useState<ApiPermission[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!isApiMode()) {
      setError('Admin roles require API mode.');
      return;
    }
    try {
      const [r, p] = await Promise.all([listRolesApi(), listPermissionsApi()]);
      setRoles(r);
      setPermissions(p);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load roles');
    }
  };

  useEffect(() => {
    if (canManage) void load();
  }, [canManage]);

  const toggle = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  };

  const startEdit = (role: ApiRole) => {
    setEditingId(role.id);
    setName(role.name);
    setDescription(role.description || '');
    setSelected(role.permissions.map((rp) => rp.permission.code));
    setOk('');
    setError('');
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setSelected([]);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError('');
    setOk('');
    try {
      if (editingId) {
        await updateRoleApi(editingId, {
          name: name.trim(),
          description: description.trim() || undefined,
          permissionCodes: selected,
        });
        setOk('Role updated.');
      } else {
        await createRoleApi({
          name: name.trim(),
          description: description.trim() || undefined,
          permissionCodes: selected,
        });
        setOk('Role created.');
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  if (!canManage) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Roles</h1>
          <p className="admin-error">You need roles.manage to edit roles.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Roles & permissions</h1>
        <p className="admin-sub">
          Owner and Super Admin always have full access. Staff use these named roles.
        </p>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2>{editingId ? 'Edit role' : 'Create role'}</h2>
          {editingId ? (
            <span className="admin-badge admin-badge--warn">Editing</span>
          ) : null}
        </div>
        <form className="admin-form" onSubmit={submit}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Description
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div>
            <p className="admin-muted" style={{ marginBottom: '0.45rem' }}>
              Permissions ({selected.length} selected)
            </p>
            <div className="admin-perms">
              {permissions.map((p) => (
                <label key={p.code}>
                  <input
                    type="checkbox"
                    checked={selected.includes(p.code)}
                    onChange={() => toggle(p.code)}
                  />
                  <span>
                    <strong>{p.code}</strong> — {p.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="admin-actions">
            <button type="submit" className="btn btn-sm" disabled={busy}>
              {busy ? 'Saving…' : editingId ? 'Update role' : 'Create role'}
            </button>
            {editingId ? (
              <button type="button" className="btn-ghost btn btn-sm" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
        {error ? <p className="admin-error">{error}</p> : null}
        {ok ? <p className="admin-ok">{ok}</p> : null}
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2>Existing roles</h2>
          <span className="admin-badge admin-badge--muted">{roles.length} roles</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Permissions</th>
                <th>Users</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.name}</strong>
                    {r.description ? (
                      <div className="admin-muted">{r.description}</div>
                    ) : null}
                  </td>
                  <td>
                    <div className="admin-actions" style={{ marginTop: 0 }}>
                      {r.permissions.length === 0 ? (
                        <span className="admin-muted">—</span>
                      ) : (
                        r.permissions.map((rp) => (
                          <span
                            key={rp.permission.code}
                            className="admin-badge admin-badge--sky"
                          >
                            {rp.permission.code}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td>{r._count?.users ?? 0}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-ghost btn btn-sm"
                      onClick={() => startEdit(r)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {roles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-empty">
                    No roles yet. Create one above.
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
