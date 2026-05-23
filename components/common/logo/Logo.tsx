/* LarnGear Technology logo — recreated from brand image */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Row 1: gear icon + wordmark */}
      <div className="flex items-center gap-2.5">
        {/* Gear / cog icon */}
        <svg
          width="38"
          height="38"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#1a4fa0"
            d="M54.6 36.4l-4.2-1a18.7 18.7 0 0 0-1-2.5l2.2-3.7a2 2 0 0 0-.3-2.4l-3.9-3.9a2 2 0 0 0-2.4-.3l-3.7 2.2a18.7 18.7 0 0 0-2.5-1l-1-4.2A2 2 0 0 0 36 18h-5.5a2 2 0 0 0-1.9 1.6l-1 4.2a18.7 18.7 0 0 0-2.5 1l-3.7-2.2a2 2 0 0 0-2.4.3l-3.9 3.9a2 2 0 0 0-.3 2.4l2.2 3.7a18.7 18.7 0 0 0-1 2.5l-4.2 1A2 2 0 0 0 10 38.4V44a2 2 0 0 0 1.6 1.9l4.2 1c.3.9.6 1.7 1 2.5l-2.2 3.7a2 2 0 0 0 .3 2.4l3.9 3.9a2 2 0 0 0 2.4.3l3.7-2.2c.8.4 1.6.7 2.5 1l1 4.2A2 2 0 0 0 30.5 64H36a2 2 0 0 0 1.9-1.6l1-4.2c.9-.3 1.7-.6 2.5-1l3.7 2.2a2 2 0 0 0 2.4-.3l3.9-3.9a2 2 0 0 0 .3-2.4l-2.2-3.7c.4-.8.7-1.6 1-2.5l4.2-1A2 2 0 0 0 56.5 44v-5.6a2 2 0 0 0-1.9-2zM33.2 47.5a8.3 8.3 0 1 1 0-16.6 8.3 8.3 0 0 1 0 16.6z"
          />
          {/* Top gear tooth accent */}
          <rect x="29" y="2" width="8" height="14" rx="2" fill="#1a4fa0" />
        </svg>

        {/* Wordmark */}
        <div className="leading-none">
          <span className="text-[22px] font-light tracking-tight text-[#9aa3b2]">
            LarnGear
          </span>
          <span className="text-[22px] font-bold tracking-tight text-[#1a4fa0]">
            Technology
          </span>
        </div>
      </div>

      {/* Blue separator line */}
      <div className="mt-1.5 h-[2px] w-full bg-[#1a4fa0]" />

      {/* Tagline */}
      <p className="mt-1 text-[10px] tracking-[0.25em] text-[#9aa3b2]">
        Bridging imagination with reality
      </p>
    </div>
  );
}
