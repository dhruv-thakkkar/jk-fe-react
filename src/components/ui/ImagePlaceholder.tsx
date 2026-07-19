import { Icon } from '../icons/Icon';

export function ImagePlaceholder({
  label,
  className = '',
  showLabel = true,
}: {
  label: string;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center bg-light text-muted text-center p-3 w-100 h-100 ${className}`}
    >
      <Icon name="image" className={`icon icon--lg ${showLabel ? 'mb-2' : ''}`} />
      {showLabel && <span className="small">{label}</span>}
    </div>
  );
}
