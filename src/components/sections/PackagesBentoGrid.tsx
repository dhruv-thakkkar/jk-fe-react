import type { PackageListItem } from '@/types/api';
import { PackageCardBento } from '../ui/PackageCardBento';

// 7 items is the cycle length that actually tiles with zero gaps in the
// 4-column dense grid below: the lg item (2x2) fills rows 1-2 cols 1-2, the
// four normal items fill the rest of rows 1-2, and the two wide items (2x1
// each) exactly fill row 3. Any other count/pattern combo leaves a
// straggler cell empty in the last row (confirmed by hand-simulating the
// grid-auto-flow: dense packing order).
export const BENTO_GRID_SIZE = 7;

const SIZE_PATTERN = [
  'bento-item--lg',
  '',
  '',
  '',
  '',
  'bento-item--wide',
  'bento-item--wide',
];

export function PackagesBentoGrid({
  packages,
  currency,
}: {
  packages: PackageListItem[];
  currency: string;
}) {
  return (
    <div className="bento-grid">
      {packages.map((pkg, index) => (
        <div key={pkg.id} className={`bento-item ${SIZE_PATTERN[index % SIZE_PATTERN.length]}`}>
          <PackageCardBento pkg={pkg} currency={currency} />
        </div>
      ))}
    </div>
  );
}
