'use client';

import { useState } from 'react';
import { Icon } from '../icons/Icon';

/** No wishlist/save backend exists yet — toggles a local pressed state only, nothing is persisted. */
export function WishlistButton({ label, className }: { label: string; className: string }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      className={className}
      aria-pressed={pressed}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setPressed((value) => !value);
      }}
    >
      <Icon name="heart" className="icon icon--sm" />
    </button>
  );
}
