import Link from "next/link";

const MachineMaintenance = () => {
  return (
    <section
      className="w-full flex items-center justify-center px-6 py-20 sm:py-28 md:py-36"
      style={{ background: "#0e0e0e" }}
    >
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
        {/* ── Headline ── */}
        <h2
          className="font-black uppercase leading-none tracking-tight
            text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
          style={{
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
          }}
        >
          <span className="text-white">The </span>
          <span style={{ color: "#E3B5FF" }}>Network</span>
        </h2>

        {/* ── Body copy ── */}
        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
          style={{ color: "#E9BCBA" }}
        >
          Join 120,000+ optimized individuals. Share telemetry, compete in
          neural-state challenges, and unlock exclusive bio-chemical protocols.
        </p>

        {/* ── CTA button ── */}
        <Link
          href="/user/register"
          className="
            inline-block mt-2
            text-xs sm:text-sm font-bold tracking-[0.25em] uppercase
            px-10 py-3.5
            transition-all duration-200 hover:scale-105 hover:opacity-90
          "
          style={{
            background: "#B040C7",
            color: "#fff",
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
          }}
        >
          Join Us
        </Link>
      </div>
    </section>
  );
};

export default MachineMaintenance;
