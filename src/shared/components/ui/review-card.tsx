import type { Review } from "@/shared/lib/mock-data";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="font-semibold text-[#0d0c15]">{review.companyName}</p>
          <p className="text-xs text-[#0d0c15]/60">{review.campaign}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-sm ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <p className="mb-2 text-sm text-[#0d0c15]/80">{review.comment}</p>
      <p className="text-xs text-[#0d0c15]/50">
        {new Date(review.date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
