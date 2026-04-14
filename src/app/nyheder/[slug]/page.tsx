import Link from "next/link";
import { clubConfig } from "@/config/club.config";
import { dummyNews } from "@/lib/dbu/dummy-data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsArticlePage({ params }: Props) {
  if (!clubConfig.features.news) return notFound();

  const { slug } = await params;
  const article = dummyNews.find((n) => n.slug === slug);

  if (!article) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link href="/nyheder" className="text-sm mb-6 block hover:underline" style={{ color: "var(--club-primary)" }}>
        ← Nyheder
      </Link>
      <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--club-primary)" }}>
        {article.category}
      </div>
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm mb-8" style={{ color: "var(--club-textMuted)" }}>{article.publishedAt}</p>
      <p style={{ color: "var(--club-text)" }}>{article.excerpt ?? "Artikelindhold kommer snart."}</p>
    </div>
  );
}

export async function generateStaticParams() {
  return dummyNews.map((n) => ({ slug: n.slug }));
}
