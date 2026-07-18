'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';
import {
  changePassword,
  updateProfile,
  type AccountSession,
} from '@/lib/auth';
import { useAuthSession } from '@/hooks/useAuthSession';

function isSignedIn(session: AccountSession | null): session is AccountSession {
  return Boolean(session && session.accountType !== 'GUEST' && session.role !== 'guest');
}

export default function SettingsForm() {
  const router = useRouter();
  const { session, ready } = useAuthSession();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [org, setOrg] = useState('');
  const [country, setCountry] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileBusy, setProfileBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordBusy, setPasswordBusy] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!isSignedIn(session)) {
      router.replace('/login');
      return;
    }
    setName(session.name);
    setPhone(session.phone ?? '');
    setOrg(session.org ?? '');
    setCountry(session.country ?? '');
  }, [ready, session, router]);

  if (!ready || !isSignedIn(session)) {
    return <p className="auth-hint">Loading…</p>;
  }

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileMsg('');
    if (!name.trim()) {
      setProfileError('Name is required.');
      return;
    }
    setProfileBusy(true);
    const result = await updateProfile({
      name: name.trim(),
      phone: phone.trim(),
      org: org.trim(),
      country: country.trim(),
    });
    setProfileBusy(false);
    if (!result.ok) {
      setProfileError(result.error);
      return;
    }
    setProfileMsg('Profile updated.');
  };

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMsg('');
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    setPasswordBusy(true);
    const result = await changePassword(currentPassword, newPassword);
    setPasswordBusy(false);
    if (!result.ok) {
      setPasswordError(result.error);
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMsg('Password changed.');
  };

  return (
    <div className="settings-stack">
      <form className="auth-form" onSubmit={saveProfile}>
        <p className="settings-section-label">Profile</p>
        <div className="auth-field">
          <label htmlFor="settings-email">Email</label>
          <input
            id="settings-email"
            type="email"
            value={session.email}
            disabled
            readOnly
          />
        </div>
        <div className="auth-field">
          <label htmlFor="settings-name">Full name</label>
          <input
            id="settings-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="settings-phone">Phone</label>
          <input
            id="settings-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="settings-org">Organization</label>
          <input
            id="settings-org"
            type="text"
            autoComplete="organization"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="settings-country">Country</label>
          <input
            id="settings-country"
            type="text"
            autoComplete="country-name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit" className="btn auth-submit" disabled={profileBusy}>
          {profileBusy ? 'Saving…' : 'Save profile'}
        </button>
        {profileError && (
          <p className="auth-toast err" role="alert">
            {profileError}
          </p>
        )}
        {profileMsg && (
          <p className="auth-toast ok" role="status">
            {profileMsg}
          </p>
        )}
      </form>

      <form className="auth-form settings-password-form" onSubmit={savePassword}>
        <p className="settings-section-label">Change password</p>
        <div className="auth-field">
          <label htmlFor="settings-current-password">Current password</label>
          <input
            id="settings-current-password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="settings-new-password">New password</label>
          <input
            id="settings-new-password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="settings-confirm-password">Confirm new password</label>
          <input
            id="settings-confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn auth-submit" disabled={passwordBusy}>
          {passwordBusy ? 'Updating…' : 'Update password'}
        </button>
        {passwordError && (
          <p className="auth-toast err" role="alert">
            {passwordError}
          </p>
        )}
        {passwordMsg && (
          <p className="auth-toast ok" role="status">
            {passwordMsg}
          </p>
        )}
      </form>
    </div>
  );
}
