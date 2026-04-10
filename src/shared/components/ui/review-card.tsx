export type ReviewCardItem = {
  id: string;
  companyName: string;
  rating: number;
  comment: string;
  date: string;
  campaign: string;
};

export function ReviewCard({ review }: { review: ReviewCardItem }) {
  return (
    <div className="rounded-2xl border border-[#5d7932]/18 bg-white p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="font-semibold text-[#0c1117]">{review.companyName}</p>
          <p className="text-xs text-[#0c1117]/60">{review.campaign}</p>
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
      <p className="mb-2 text-sm text-[#0c1117]/80">{review.comment}</p>
      <p className="text-xs text-[#0c1117]/50">
        {new Date(review.date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
