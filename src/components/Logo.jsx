export default function Logo({ variant = "dark", className = "" }) {
  const wordColor = variant === "light" ? "#ffffff" : "#0a0a0a";

  return (
    <svg
      viewBox="0 0 190 44"
      className={className}
      role="img"
      aria-label="anofamig"
    >
      <g>
        {/* mark: overlapping roof/pin shapes */}
        <path
          d="M4 22 L20 8 L36 22 L36 34 C36 36.2 34.2 38 32 38 H8 C5.8 38 4 36.2 4 34 Z"
          fill="#00a6fb"
        />
        <path
          d="M14 38 V24 C14 21.8 15.8 20 18 20 H22 C24.2 20 26 21.8 26 24 V38 Z"
          fill="#f1faee"
        />
      </g>
      <text
        x="46"
        y="30"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill={wordColor}
        letterSpacing="-0.3"
      >
        anofa
        <tspan fill="#00a6fb">mig</tspan>
      </text>
    </svg>
  );
}
