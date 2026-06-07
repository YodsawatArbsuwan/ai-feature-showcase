import Logo from "@/components/common/logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Left — brand info */}
          <div className="max-w-xs">
            <Logo className="brightness-0 invert" />
            <p className="mt-4 text-sm font-semibold text-white/90">
              Larngear Technology co.,ltd / Streaming co.,ltd
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/55">
              Empire Tower, 27F (27041), S Sathon Rd, Sathon, Bangkok 10120
            </p>
            {/* <p className="mt-1 text-xs text-white/55">โทรศัพท์ 02-343-1500</p>
            <p className="text-xs text-white/55">โทรสาร 02-343-1551</p>
            <p className="mt-1 text-xs text-white/55">
              อีเมล: isranakan@thaihealth.or.th
            </p> */}
          </div>

          {/* Right — contact + social */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Contact
            </p>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-white/40">☎</span> 061-827-6888
              </p>
              <p className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-white/40">✉</span> support@larngeartech.com
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-brand hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-brand hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-brand hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-brand hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
                </svg>
              </a>
            </div>

            {/* Language selector */}
            <select className="w-32 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 outline-none focus:border-brand">
              <option value="en">English</option>
              <option value="th">ภาษาไทย</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <p className="text-center text-[11px] text-white/40">
          © สงวนลิขสิทธิ์ 2021 อาคารศูนย์เรียนรู้สุขภาวะ (สสส.) (All Rights Reserved)
        </p>
      </div>
    </footer>
  );
}
