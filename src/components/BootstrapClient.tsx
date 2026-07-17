'use client';

import { useEffect } from 'react';

/** Loads Bootstrap's JS bundle (collapse, dropdown, modal, offcanvas, ...) once on the client. */
export function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return null;
}
