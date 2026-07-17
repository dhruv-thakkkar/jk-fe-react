import type { ReactNode } from 'react';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
      <div style={{ maxWidth: '620px' }}>
        <span className="text-primary fw-semibold text-uppercase small d-block mb-2" style={{ letterSpacing: '0.06em' }}>
          {eyebrow}
        </span>
        <h2 className="mb-1">{title}</h2>
        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>
      {action && <div className="d-none d-lg-block">{action}</div>}
    </div>
  );
}
