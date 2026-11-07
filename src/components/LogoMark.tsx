interface LogoMarkProps {
  className?: string;
}

/** Gear + circuit-trace "M" + sensor arcs. Colour follows currentColor. */
const LogoMark = ({ className }: LogoMarkProps) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    role="img"
    aria-label="Mechatronics Technology logo"
  >
    <g fill="none" stroke="currentColor">
      <circle cx="60" cy="60" r="46" strokeWidth="10" strokeDasharray="12.05 12.05" strokeDashoffset="6.025" />
      <circle cx="60" cy="60" r="42" strokeWidth="4" />
      <polyline points="34,80 34,44 60,66 86,44 86,80" strokeWidth="7" strokeLinejoin="miter" strokeMiterlimit="10" />
    </g>
    <circle cx="60" cy="66" r="6" fill="currentColor" />
  </svg>
);

export default LogoMark;
