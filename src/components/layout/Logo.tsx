type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 40, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="#0e6aa8" strokeWidth="2.5" />
      <g stroke="#33c3bf" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="9.5" x2="32" y2="14.5" />
        <line x1="32" y1="49.5" x2="32" y2="54.5" />
      </g>
      <path
        d="M28 22 L28 36 Q28 41 23 41 Q18.5 41 18.5 37"
        fill="none"
        stroke="#17324a"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 22 L34 42 M34 32 L44 22 M34 32 L45 42"
        fill="none"
        stroke="#33c3bf"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
