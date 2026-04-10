"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ReviewCard, type ReviewCardItem } from "@/shared/components/ui/review-card";
import { getPublicInfluencerProfileBySlug } from "@/shared/services/firebase-public-profile-service";

type PublicProfileState = {
  fullName: string;
  avatarUrl: string;
  handle: string;
  location: string;
  categories: string[];
  bio: string;
  followers: string;
  avgReach: string;
  engagementRate: string;
  estimatedPrice: string;
  completedServices: number;
  languages: string[];
  portfolio: string[];
  averageRating?: number;
  totalReviews: number;
  instagramConnected: boolean;
  instagramMetrics?: {
    monthlyReach: string;
    storyViews: string;
    demographics: {
      age: string;
      gender: string;
      topCountries: string[];
    };
  };
  reviews: ReviewCardItem[];
  id: string;
};

export default function InfluencerPublicProfilePage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const [profile, setProfile] = useState<PublicProfileState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!slug) {
        setError("Perfil inválido.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const data = await getPublicInfluencerProfileBySlug(slug);
      if (cancelled) return;

      if (!data) {
        setError("No se encontró el perfil en la base de datos.");
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    load().catch(() => {
      if (cancelled) return;
      setError("No se pudo cargar el perfil desde la base de datos.");
      setProfile(null);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="rounded-3xl border border-[#5d7932]/18 bg-white p-6 text-sm text-[#0c1117]/70">
          Cargando perfil desde la base de datos...
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          {error ?? "Perfil no disponible."}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="rounded-3xl border border-[#5d7932]/18 bg-white p-5 sm:p-8 lg:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={profile.avatarUrl || "/avatars/influencer-example.svg"}
              alt={`Foto de perfil de ${profile.fullName}`}
              width={88}
              height={88}
              className="h-16 w-16 rounded-full border border-[#5d7932]/18 object-cover sm:h-20 sm:w-20"
            />
            <div>
              <h1 className="text-2xl font-black text-[#0c1117] sm:text-3xl">{profile.fullName}</h1>
              <p className="mt-1 text-sm font-medium text-[#0c1117]/75">{profile.handle}</p>
              <p className="text-sm text-[#0c1117]/70">{profile.location}</p>
            </div>
          </div>
          <span className="rounded-full bg-[#c0e2ff] px-3 py-1 text-xs font-semibold text-[#0c1117]">
            {profile.estimatedPrice} por colaboración
          </span>
        </div>

        <p className="mt-4 text-sm text-[#0c1117]/80">{profile.bio}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricBox label="Seguidores" value={profile.followers} />
          <MetricBox label="Alcance promedio" value={profile.avgReach} />
          <MetricBox label="Engagement" value={profile.engagementRate} />
          <MetricBox label="Servicios completados" value={String(profile.completedServices)} />
        </div>

        {profile.instagramConnected && profile.instagramMetrics ? (
          <div className="mt-6 rounded-2xl border border-[#5d7932]/18 bg-[#edf4ea] p-5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#0c1117]">Métricas de Instagram</h2>
              <span className="rounded-full bg-[#42d87f]/22 px-2 py-0.5 text-xs font-semibold text-[#5d7932]">
                ✓ Conectado
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold text-[#0c1117]/60">Alcance mensual</p>
                <p className="text-lg font-bold text-[#0c1117]">{profile.instagramMetrics.monthlyReach}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0c1117]/60">Vistas de stories</p>
                <p className="text-lg font-bold text-[#0c1117]">{profile.instagramMetrics.storyViews}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0c1117]/60">Edad principal</p>
                <p className="text-lg font-bold text-[#0c1117]">{profile.instagramMetrics.demographics.age}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold text-[#0c1117]/60">Género</p>
              <p className="text-sm text-[#0c1117]">{profile.instagramMetrics.demographics.gender}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs font-semibold text-[#0c1117]/60">Top países</p>
              <p className="text-sm text-[#0c1117]">{profile.instagramMetrics.demographics.topCountries.join(", ")}</p>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#5d7932]/18 bg-[#edf4ea] p-5">
            <h2 className="text-lg font-bold text-[#0c1117]">Categorías</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0c1117]"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#0c1117]">Idiomas</h3>
            <p className="mt-1 text-sm text-[#0c1117]/75">{profile.languages.join(" | ")}</p>
          </div>

          <div className="rounded-2xl border border-[#5d7932]/18 bg-[#edf4ea] p-5">
            <h2 className="text-lg font-bold text-[#0c1117]">Portfolio</h2>
            {profile.portfolio.length === 0 ? (
              <p className="mt-3 text-sm text-[#0c1117]/70">Sin portafolio registrado en base de datos.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {profile.portfolio.map((item, i) => (
                  <li key={i} className="text-sm text-[#0c1117]/80">
                    • {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0c1117]">
              Reviews ({profile.totalReviews})
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
                <span className="text-sm font-semibold text-[#0c1117]">
                  {profile.averageRating.toFixed(1)}
                </span>
              </div>
            ) : null}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {profile.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href={`/chat?contactId=${encodeURIComponent(profile.id)}&contactName=${encodeURIComponent(profile.fullName)}`}
            className="rounded-xl bg-[#0c1117] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#244124]"
          >
            Enviar mensaje
          </Link>
          <Link
            href="/explorar"
            className="rounded-xl border border-[#5d7932]/24 px-5 py-2.5 text-sm font-semibold text-[#0c1117] hover:bg-[#edf4ea]"
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
    <div className="rounded-xl border border-[#5d7932]/18 bg-[#edf4ea] p-3">
      <p className="text-xs font-semibold text-[#0c1117]/60">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#0c1117]">{value}</p>
    </div>
  );
}

