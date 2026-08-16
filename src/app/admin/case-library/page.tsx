'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  createShowcaseCaseApi,
  deleteShowcaseCaseApi,
  listShowcaseCasesAdminApi,
  resolveMediaUrl,
  updateShowcaseCaseApi,
  uploadShowcaseImageApi,
  type ShowcaseApplication,
  type ShowcaseCase,
} from '@/lib/api/case-library';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';

const APPLICATIONS: { value: ShowcaseApplication; label: string }[] = [
  { value: 'RESTORATIVE', label: 'Restorative' },
  { value: 'IMPLANT', label: 'Implant' },
  { value: 'ORTHODONTIC', label: 'Orthodontic' },
  { value: 'DENTURE', label: 'Denture' },
  { value: 'PROSTHETICS', label: 'Prosthetics' },
  { value: 'OTHER', label: 'Other' },
];

const PRODUCT_KEYS = ['scanner', 'printer', 'curing', 'resin'] as const;

const emptyForm = {
  slug: '',
  title: '',
  badge: '',
  application: 'RESTORATIVE' as ShowcaseApplication,
  tags: '',
  summary: '',
  coverImageUrl: '',
  coverImageAlt: '',
  beforeImageUrl: '',
  afterImageUrl: '',
  href: '',
  productKeys: [] as string[],
  published: true,
  featured: false,
  sortOrder: '0',
};

function slugFromTitle(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function ImageUploadField({
  label,
  value,
  required,
  uploading,
  onChangeUrl,
  onUpload,
}: {
  label: string;
  value: string;
  required?: boolean;
  uploading: boolean;
  onChangeUrl: (url: string) => void;
  onUpload: (file: File) => Promise<void>;
}) {
  return (
    <div className="admin-image-field">
      <p className="admin-muted" style={{ marginBottom: '0.45rem' }}>
        {label}
        {required ? ' *' : ''}
      </p>
      <div className="admin-image-field__row">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (file) void onUpload(file);
          }}
        />
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resolveMediaUrl(value)} alt="" className="admin-image-field__preview" />
        ) : (
          <span className="admin-muted">No image yet</span>
        )}
      </div>
      <input
        value={value}
        onChange={(e) => onChangeUrl(e.target.value)}
        placeholder="Or paste /media/... or /img/... URL"
        required={required}
      />
    </div>
  );
}

export default function AdminCaseLibraryPage() {
  const { session } = useAuthSession();
  const canManage = hasPermission(session, 'case-library.manage');
  const [cases, setCases] = useState<ShowcaseCase[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const load = async () => {
    try {
      const rows = await listShowcaseCasesAdminApi();
      setCases(rows);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load cases');
    }
  };

  useEffect(() => {
    if (canManage) void load();
  }, [canManage]);

  const setField = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleProduct = (key: string) => {
    setForm((prev) => ({
      ...prev,
      productKeys: prev.productKeys.includes(key)
        ? prev.productKeys.filter((k) => k !== key)
        : [...prev.productKeys, key],
    }));
  };

  const uploadField = async (
    field: 'coverImageUrl' | 'beforeImageUrl' | 'afterImageUrl',
    file: File,
  ) => {
    setUploadingField(field);
    setError('');
    setOk('');
    try {
      const uploaded = await uploadShowcaseImageApi(file);
      setField(field, uploaded.url);
      setOk(`Uploaded ${file.name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingField(null);
    }
  };

  const startEdit = (row: ShowcaseCase) => {
    setEditingId(row.id);
    setForm({
      slug: row.slug,
      title: row.title,
      badge: row.badge,
      application: row.application,
      tags: row.tags.join(', '),
      summary: row.summary || '',
      coverImageUrl: row.coverImageUrl,
      coverImageAlt: row.coverImageAlt || '',
      beforeImageUrl: row.beforeImageUrl || '',
      afterImageUrl: row.afterImageUrl || '',
      href: row.href || '',
      productKeys: [...row.productKeys],
      published: row.published,
      featured: row.featured,
      sortOrder: String(row.sortOrder),
    });
    setOk('');
    setError('');
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.coverImageUrl.trim()) {
      setError('Title and cover image are required.');
      return;
    }
    setBusy(true);
    setError('');
    setOk('');
    const payload = {
      slug: form.slug.trim() || slugFromTitle(form.title),
      title: form.title.trim(),
      badge: form.badge.trim() || form.application,
      application: form.application,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      summary: form.summary.trim() || undefined,
      coverImageUrl: form.coverImageUrl.trim(),
      coverImageAlt: form.coverImageAlt.trim() || undefined,
      beforeImageUrl: form.beforeImageUrl.trim() || undefined,
      afterImageUrl: form.afterImageUrl.trim() || undefined,
      href: form.href.trim() || undefined,
      productKeys: form.productKeys,
      published: form.published,
      featured: form.featured,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (editingId) {
        await updateShowcaseCaseApi(editingId, payload);
        setOk('Case updated.');
      } else {
        await createShowcaseCaseApi(payload);
        setOk('Case created.');
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (row: ShowcaseCase) => {
    if (!window.confirm(`Delete “${row.title}”? This cannot be undone.`)) return;
    setBusy(true);
    setError('');
    setOk('');
    try {
      await deleteShowcaseCaseApi(row.id);
      if (editingId === row.id) resetForm();
      setOk('Case deleted.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  if (!canManage) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Case Library</h1>
          <p className="admin-error">You need case-library.manage to edit the Real Case Library.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Case Library CMS</h1>
        <p className="admin-sub">
          Upload cover / before / after images for the public <a href="/solutions/cases">/solutions/cases</a> page.
          Files go to Cloudflare R2 when <code>MEDIA_STORAGE=r2</code> (absolute public URL), or
          local <code>/media/case-library/…</code> when <code>MEDIA_STORAGE=local</code>.
        </p>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      {ok ? <p className="admin-ok">{ok}</p> : null}

      <div className="admin-card">
        <div className="admin-card-head">
          <h2>{editingId ? 'Edit case' : 'Add case'}</h2>
          {editingId ? <span className="admin-badge admin-badge--warn">Editing</span> : null}
        </div>
        <form className="admin-form" onSubmit={submit}>
          <label>
            Title
            <input
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  title,
                  slug: editingId ? prev.slug : slugFromTitle(title),
                }));
              }}
              required
            />
          </label>
          <label>
            Slug
            <input value={form.slug} onChange={(e) => setField('slug', e.target.value)} required />
          </label>
          <label>
            Badge
            <input
              value={form.badge}
              onChange={(e) => setField('badge', e.target.value)}
              placeholder="Restorative"
              required
            />
          </label>
          <label>
            Application
            <select
              value={form.application}
              onChange={(e) => setField('application', e.target.value as ShowcaseApplication)}
            >
              {APPLICATIONS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tags (comma-separated)
            <input
              value={form.tags}
              onChange={(e) => setField('tags', e.target.value)}
              placeholder="Crown, 2 Visits"
            />
          </label>

          <ImageUploadField
            label="Cover image"
            value={form.coverImageUrl}
            required
            uploading={uploadingField === 'coverImageUrl'}
            onChangeUrl={(url) => setField('coverImageUrl', url)}
            onUpload={(file) => uploadField('coverImageUrl', file)}
          />
          <label>
            Cover image alt
            <input
              value={form.coverImageAlt}
              onChange={(e) => setField('coverImageAlt', e.target.value)}
            />
          </label>
          <ImageUploadField
            label="Before image"
            value={form.beforeImageUrl}
            uploading={uploadingField === 'beforeImageUrl'}
            onChangeUrl={(url) => setField('beforeImageUrl', url)}
            onUpload={(file) => uploadField('beforeImageUrl', file)}
          />
          <ImageUploadField
            label="After image"
            value={form.afterImageUrl}
            uploading={uploadingField === 'afterImageUrl'}
            onChangeUrl={(url) => setField('afterImageUrl', url)}
            onUpload={(file) => uploadField('afterImageUrl', file)}
          />

          <label>
            Detail link (href) — leave empty to use /cases/your-slug
            <input
              value={form.href}
              onChange={(e) => setField('href', e.target.value)}
              placeholder="/cases/your-case-slug"
            />
          </label>
          <label>
            Sort order
            <input
              type="number"
              min={0}
              value={form.sortOrder}
              onChange={(e) => setField('sortOrder', e.target.value)}
            />
          </label>
          <label>
            Summary
            <textarea
              value={form.summary}
              onChange={(e) => setField('summary', e.target.value)}
              rows={3}
            />
          </label>

          <div>
            <p className="admin-muted" style={{ marginBottom: '0.45rem' }}>
              Products used
            </p>
            <div className="admin-perms">
              {PRODUCT_KEYS.map((key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    checked={form.productKeys.includes(key)}
                    onChange={() => toggleProduct(key)}
                  />
                  <span>
                    <strong>{key}</strong>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="admin-perms" style={{ marginTop: '0.5rem' }}>
            <label>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setField('published', e.target.checked)}
              />
              <span>
                <strong>Published</strong> — visible on /solutions/cases
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setField('featured', e.target.checked)}
              />
              <span>
                <strong>Featured</strong> — show in featured carousel
              </span>
            </label>
          </div>

          <div className="admin-actions">
            <button className="btn btn-sm" type="submit" disabled={busy || Boolean(uploadingField)}>
              {busy ? 'Saving…' : editingId ? 'Update case' : 'Create case'}
            </button>
            {editingId ? (
              <button className="btn-ghost btn btn-sm" type="button" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="admin-card" style={{ marginTop: '1rem' }}>
        <div className="admin-card-head">
          <h2>All cases ({cases.length})</h2>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Application</th>
                <th>Status</th>
                <th>Order</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cases.map((row) => (
                <tr key={row.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveMediaUrl(row.coverImageUrl)}
                      alt=""
                      className="admin-image-field__thumb"
                    />
                  </td>
                  <td>
                    <strong>{row.title}</strong>
                    <div className="admin-muted">{row.slug}</div>
                  </td>
                  <td>{row.application}</td>
                  <td>
                    {row.published ? (
                      <span className="admin-badge">Published</span>
                    ) : (
                      <span className="admin-badge admin-badge--warn">Draft</span>
                    )}
                    {row.featured ? (
                      <span className="admin-badge" style={{ marginLeft: 6 }}>
                        Featured
                      </span>
                    ) : null}
                  </td>
                  <td>{row.sortOrder}</td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" className="btn-ghost btn btn-sm" onClick={() => startEdit(row)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-ghost btn btn-sm"
                        onClick={() => void onDelete(row)}
                        disabled={busy}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-muted">
                    No cases yet. Create the first one above.
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
