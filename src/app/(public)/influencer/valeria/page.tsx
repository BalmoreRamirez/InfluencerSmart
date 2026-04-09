"use client";

import Link from "next/link";
import Image from "next/image";
import { influencerProfile, allReviews } from "@/shared/lib/mock-data";
import { ReviewCard } from "@/shared/components/ui/review-card";

export default function InfluencerPublicProfilePage() {
  const profile = influencerProfile;
  const reviews = allReviews.filter((r) => r.influencerHandle === profile.handle);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="rounded-3xl border border-black/10 bg-white p-5 sm:p-8 lg:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={profile.avatarUrl ?? "/avatars/influencer-example.svg"}
              alt={`Foto de perfil de ${profile.fullName}`}
              width={88}
              height={88}
              className="h-16 w-16 rounded-full border border-black/10 object-cover sm:h-20 sm:w-20"
            />
            <div>
              <h1 className="text-2xl font-black text-[#0d0c15] sm:text-3xl">{profile.fullName}</h1>
              <p className="mt-1 text-sm font-medium text-[#0d0c15]/75">{profile.handle}</p>
              <p className="text-sm text-[#0d0c15]/70">{profile.location}</p>
            </div>
          </div>
          <span className="rounded-full bg-[#c1b8ff] px-3 py-1 text-xs font-semibold text-[#0d0c15]">
            {profile.estimatedPrice} por colaboracion
          </span>
        </div>

        <p className="mt-4 text-sm text-[#0d0c15]/80">{profile.bio}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricBox label="Seguidores" value={profile.followers} />
          <MetricBox label="Alcance promedio" value={profile.avgReach} />
          <MetricBox label="Engagement" value={profile.engagementRate} />
          <MetricBox label="Servicios completados" value={String(profile.completedServices)} />
        </div>

        {profile.instagramConnected && profile.instagramMetrics ? (
          <div className="mt-6 rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#0d0c15]">Métricas de Instagram</h2>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                ✓ Conectado
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold text-[#0d0c15]/60">Alcance mensual</p>
                <p className="text-lg font-bold text-[#0d0c15]">{profile.instagramMetrics.monthlyReach}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0d0c15]/60">Vistas de stories</p>
                <p className="text-lg font-bold text-[#0d0c15]">{profile.instagramMetrics.storyViews}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0d0c15]/60">Edad principal</p>
                <p className="text-lg font-bold text-[#0d0c15]">{profile.instagramMetrics.demographics.age}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold text-[#0d0c15]/60">Género</p>
              <p className="text-sm text-[#0d0c15]">{profile.instagramMetrics.demographics.gender}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-[#0d0c15]/60">Top países</p>
              <p className="text-sm text-[#0d0c15]">{profile.instagramMetrics.demographics.topCountries.join(", ")}</p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Categorías</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0d0c15]"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#0d0c15]">Idiomas</h3>
            <p className="mt-1 text-sm text-[#0d0c15]/75">{profile.languages.join(" | ")}</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
            <h2 className="text-lg font-bold text-[#0d0c15]">Portfolio</h2>
            <ul className="mt-3 space-y-2">
              {profile.portfolio.map((item, i) => (
                <li key={i} className="text-sm text-[#0d0c15]/80">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0d0c15]">
              Reviews ({profile.totalReviews || reviews.length})
            </h2>
            {profile.averageRating ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(profile.averageRating!)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#0d0c15]">
                  {profile.averageRating.toFixed(1)}
                </span>
              </div>
            ) : null}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/chat"
            className="rounded-xl bg-[#0d0c15] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1f1c30]"
          >
            Enviar mensaje
          </Link>
          <Link
            href="/explorar"
            className="rounded-xl border border-black/15 px-5 py-2.5 text-sm font-semibold text-[#0d0c15] hover:bg-[#f4f4f4]"
          >
            Volver a búsqueda
          </Link>
        </div>
      </div>
    </main>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-[#f4f4f4] p-3">
      <p className="text-xs font-semibold text-[#0d0c15]/60">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#0d0c15]">{value}</p>
    </div>
  );
}
