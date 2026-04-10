type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-[#5d7932]/18 bg-white p-4 shadow-[0_6px_20px_rgba(13,12,21,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0c1117]/55">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black text-[#0c1117]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[#0c1117]/70">{hint}</p> : null}
    </article>
  );
}
