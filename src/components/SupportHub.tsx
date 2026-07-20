"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ChannelId = "whats" | "chat" | "doc" | "shield";

interface SupportChannel {
  id: ChannelId;
  t: string;
  d: string;
  meta: string;
  detail: string;
  hours: string;
  action: string;
  href: string;
}

const CHANNELS: SupportChannel[] = [
  {
    id: "whats",
    t: "WhatsApp care",
    d: "Instant help from our customer-care team, any day.",
    meta: "24/7",
    detail: "Message us for setup help, troubleshooting and order questions.",
    hours: "Available around the clock",
    action: "Open WhatsApp",
    href: "/support",
  },
  {
    id: "chat",
    t: "ODYX AI Agent & live chat",
    d: "Guided answers across the whole ODYX ecosystem.",
    meta: "Online",
    detail:
      "AI-guided support with escalation to a live specialist when needed.",
    hours: "Mon–Sat, 8am–8pm",
    action: "Start live chat",
    href: "/support",
  },
  {
    id: "doc",
    t: "Help center & manuals",
    d: "Setup guides, troubleshooting and firmware downloads.",
    meta: "Self-service",
    detail:
      "Searchable knowledge base with device manuals and video tutorials.",
    hours: "Always available",
    action: "Browse help center",
    href: "/support",
  },
  {
    id: "shield",
    t: "Warranty & service",
    d: "Register devices, track repairs and coverage in one place.",
    meta: "Coverage",
    detail: "Check warranty status, book repairs and download service reports.",
    hours: "Response within 24h",
    action: "Manage warranty",
    href: "/support#register",
  },
];

const ICONS: Record<ChannelId, React.ReactNode> = {
  whats: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.6-4.5A8 8 0 1 1 8 19.4z" />
      <path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1.5-1 1c-1-.5-2-1.5-2.5-2.5l1-1L10.5 8z" />
    </svg>
  ),
  chat: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16v12H8l-4 4z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
  doc: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  shield: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const Arrow = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function SupportHub() {
  const [open, setOpen] = useState<ChannelId | null>("whats");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const toggle = (id: ChannelId) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  return (
    <div className="sh-wrap m-up">
      <div className="sh-live">
        <div className="sh-live-glow" aria-hidden />
        <span className="sh-live-badge">Live help</span>
        <h3>Need answers now?</h3>
        <p>
          Reach our team instantly through WhatsApp or start a guided chat with
          ODYX AI Agent.
        </p>
        <div className="sh-live-actions">
          <Link className="btn sh-live-btn" href="/support">
            {ICONS.whats}
            WhatsApp care
          </Link>
          <Link className="btn btn-ghost sh-live-btn" href="/support">
            {ICONS.chat}
            ODYX AI Agent
          </Link>
        </div>
      </div>

      <div className="sh-accordion" role="region" aria-label="Support channels">
        {CHANNELS.map((ch) => {
          const isOpen = open === ch.id;
          return (
            <div
              key={ch.id}
              className={`sh-item${isOpen ? " open" : ""}`}
              data-channel={ch.id}
            >
              <button
                type="button"
                className="sh-trigger"
                aria-expanded={isOpen}
                onClick={() => toggle(ch.id)}
              >
                <span className="sh-trigger-ic">{ICONS[ch.id]}</span>
                <span className="sh-trigger-body">
                  <span className="sh-trigger-meta">{ch.meta}</span>
                  <span className="sh-trigger-title">{ch.t}</span>
                  <span className="sh-trigger-desc">{ch.d}</span>
                </span>
                <span className="sh-chevron" aria-hidden>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <div
                className="sh-panel"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: reduced ? "none" : undefined,
                }}
              >
                <div className="sh-panel-inner">
                  <p>{ch.detail}</p>
                  <span className="sh-hours">{ch.hours}</span>
                  <Link className="sh-action" href={ch.href}>
                    {ch.action} <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
