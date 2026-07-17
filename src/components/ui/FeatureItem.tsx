import { Icon } from '../icons/Icon';

export function FeatureItem({
  icon,
  title,
  text,
  size = 'md',
}: {
  icon: string;
  title: string;
  text: string;
  size?: 'sm' | 'md';
}) {
  const circleSize = size === 'sm' ? 36 : 48;

  return (
    <div className="d-flex gap-3">
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary flex-shrink-0"
        style={{ width: circleSize, height: circleSize }}
      >
        <Icon name={icon} className={size === 'sm' ? 'icon icon--sm' : 'icon'} />
      </div>
      <div>
        <h3 className="fs-6 mb-1">{title}</h3>
        <p className="text-muted mb-0 small">{text}</p>
      </div>
    </div>
  );
}
