export default function SecHead({
  eyebrow,
  h2,
  p,
  action,
  align = 'center',
}: {
  eyebrow: string;
  h2: string;
  p?: string;
  action?: React.ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`sec-head reveal${align === 'left' ? ' left' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="m-underline">{h2}</h2>
      {p && <p>{p}</p>}
      {action && <div className="sec-head-action">{action}</div>}
    </div>
  );
}
