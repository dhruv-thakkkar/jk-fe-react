/** Renders once in the root layout; icons elsewhere reference these via <svg><use href="#icon-x" /></svg>. */
export function IconSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </symbol>
        <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
        </symbol>
        <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
        </symbol>
        <symbol id="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.5s-7.5-4.6-10-9.4C.6 8 2 4.5 5.3 3.7c2.1-.5 4 .4 5 2 .9-1.6 2.9-2.5 5-2C18.6 4.5 20 8 22 11.1 19.5 15.9 12 20.5 12 20.5Z" />
        </symbol>
        <symbol id="icon-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 3.1 6.6 7.2.8-5.4 4.9 1.6 7.1L12 17.8 5.5 21.4l1.6-7.1-5.4-4.9 7.2-.8L12 2Z" />
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
        </symbol>
        <symbol id="icon-map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s7-6.4 7-12.5a7 7 0 0 0-14 0C5 15.6 12 22 12 22Z" /><circle cx="12" cy="9.5" r="2.5" />
        </symbol>
        <symbol id="icon-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3.2" /><path d="M2.8 20c.9-3.4 3.4-5.4 6.2-5.4s5.3 2 6.2 5.4" />
          <circle cx="17.5" cy="9" r="2.4" /><path d="M15.5 20c.6-2.5 2.1-4.2 3.9-4.9" />
        </symbol>
        <symbol id="icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" />
        </symbol>
        <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4,13 9,18 20,6" />
        </symbol>
        <symbol id="icon-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><polyline points="8,12.5 11,15.5 16,9" />
        </symbol>
        <symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5,9 12,16 19,9" />
        </symbol>
        <symbol id="icon-chevron-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5,15 12,8 19,15" />
        </symbol>
        <symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9,5 16,12 9,19" />
        </symbol>
        <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15,5 8,12 15,19" />
        </symbol>
        <symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="12" x2="20" y2="12" /><polyline points="13,5 20,12 13,19" />
        </symbol>
        <symbol id="icon-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="20" y1="12" x2="4" y2="12" /><polyline points="11,5 4,12 11,19" />
        </symbol>
        <symbol id="icon-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h3.2l1.3 4.4L7.6 10a11 11 0 0 0 6.4 6.4l1.6-1.9 4.4 1.3V19a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 4Z" />
        </symbol>
        <symbol id="icon-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3,6 12,13 21,6" />
        </symbol>
        <symbol id="icon-facebook" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.8-1.5H17V4.8C16.6 4.7 15.6 4.6 14.5 4.6 12.1 4.6 10.5 6 10.5 8.7V11H8v3h2.5v7Z" />
        </symbol>
        <symbol id="icon-twitter" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 5.3c-.7.4-1.5.6-2.3.8a3.6 3.6 0 0 0-6.1 3.3A10.2 10.2 0 0 1 5.1 5.6a3.6 3.6 0 0 0 1.1 4.8c-.6 0-1.2-.2-1.7-.4v.1c0 1.8 1.3 3.2 3 3.6-.6.1-1.1.2-1.7.1a3.6 3.6 0 0 0 3.4 2.5A7.2 7.2 0 0 1 3 17.7a10.2 10.2 0 0 0 5.5 1.6c6.6 0 10.2-5.5 10.2-10.2v-.5c.7-.5 1.3-1.2 1.8-1.9-.6.3-1.3.5-2 .6.7-.5 1.3-1.2 1.5-2Z" />
        </symbol>
        <symbol id="icon-instagram" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" />
        </symbol>
        <symbol id="icon-youtube" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="6" width="19" height="12" rx="3" /><polygon points="10.5,9.5 15.5,12 10.5,14.5" />
        </symbol>
        <symbol id="icon-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><line x1="3" y1="12" x2="21" y2="12" />
        </symbol>
        <symbol id="icon-plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 21 12 16l-8-2.5v-2L12 13V6a1.5 1.5 0 0 1 3 0v7l8-2v2L15 16l1.5 5-2-1-1-3-1 3-2 1Z" />
        </symbol>
        <symbol id="icon-compass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><polygon points="15,9 13,13 9,15 11,11" />
        </symbol>
        <symbol id="icon-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.5 3H5a2 2 0 0 0-2 2v7.5a2 2 0 0 0 .6 1.4l9 9a2 2 0 0 0 2.8 0l7-7a2 2 0 0 0 0-2.8l-9-9A2 2 0 0 0 12.5 3Z" /><circle cx="8" cy="8" r="1.5" />
        </symbol>
        <symbol id="icon-credit-card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="5.5" width="19" height="13" rx="2" /><line x1="2.5" y1="10" x2="21.5" y2="10" /><line x1="5.5" y1="15" x2="9.5" y2="15" />
        </symbol>
        <symbol id="icon-quote" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M9.5 6C6.5 7 4.5 9.7 4.5 13c0 2.5 1.6 4.3 3.6 4.3 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-3 .2-1.6 1.4-3 3-3.6L9.5 6Zm9 0C15.5 7 13.5 9.7 13.5 13c0 2.5 1.6 4.3 3.6 4.3 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-3 .2-1.6 1.4-3 3-3.6L18.5 6Z" />
        </symbol>
        <symbol id="icon-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4 11 8-7 8 7" /><path d="M6 9.5V20h12V9.5" />
        </symbol>
        <symbol id="icon-headset" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2.5" y="13" width="4" height="6" rx="1.5" /><rect x="17.5" y="13" width="4" height="6" rx="1.5" /><path d="M19.5 19v1a3 3 0 0 1-3 3h-3" />
        </symbol>
        <symbol id="icon-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 5 5.5V11c0 4.8 3 8.4 7 9.8 4-1.4 7-5 7-9.8V5.5L12 3Z" /><polyline points="9,12 11,14 15,10" />
        </symbol>
        <symbol id="icon-alert-triangle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5 22 20.5H2L12 3.5Z" /><line x1="12" y1="9.5" x2="12" y2="14" /><line x1="12" y1="17" x2="12" y2="17.1" />
        </symbol>
      </defs>
    </svg>
  );
}
