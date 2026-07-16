'use client';

import { useEffect, useState } from 'react';
import {
  confirmOrderApi,
  listAdminOrdersApi,
  shipOrderApi,
  type ApiAdminOrder,
} from '@/lib/api/admin';
import { useAuthSession } from '@/hooks/useAuthSession';
import { hasPermission } from '@/lib/permissions';
import { isApiMode } from '@/lib/config';

export default function AdminOrdersPage() {
  const { session } = useAuthSession();
  const canRead = hasPermission(session, 'orders.read');
  const canManage = hasPermission(session, 'orders.manage');
  const [orders, setOrders] = useState<ApiAdminOrder[]>([]);
  const [error, setError] = useState('');

  const load = async () => {
    if (!isApiMode()) {
      setError('Orders require API mode.');
      return;
    }
    try {
      setOrders(await listAdminOrdersApi());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load orders');
    }
  };

  useEffect(() => {
    if (canRead) void load();
  }, [canRead]);

  if (!canRead) {
    return (
      <>
        <div className="admin-page-head">
          <h1>Orders</h1>
          <p className="admin-error">You need orders.read.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-page-head">
        <h1>Orders</h1>
        <p className="admin-sub">Confirm payments and move customer shipments forward.</p>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>All orders</h2>
          <span className="admin-badge admin-badge--muted">{orders.length} total</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Total</th>
                <th>Contact</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <strong>{o.orderNumber}</strong>
                    <div className="admin-muted">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge--sky">{o.status}</span>
                  </td>
                  <td>
                    <strong>{o.total}</strong>
                  </td>
                  <td>
                    {o.contactName || '—'}
                    <div className="admin-muted">{o.contactPhone}</div>
                  </td>
                  <td>
                    {canManage ? (
                      <div className="admin-actions">
                        <button
                          type="button"
                          className="btn-ghost btn btn-sm"
                          onClick={() => void confirmOrderApi(o.id).then(load)}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => void shipOrderApi(o.id).then(load)}
                        >
                          Ship
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-empty">
                    No orders yet.
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
