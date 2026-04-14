"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { dummyNews } from "@/lib/dbu/dummy-data";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string;
  imageUrl: string;
  isDraft: boolean;
}

function loadArticles(): NewsArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("clubhub:nyheder");
    if (stored) return JSON.parse(stored) as NewsArticle[];
  } catch {
    // ignore
  }
  // Seed from dummy data on first load
  return dummyNews.map((n, i) => ({
    id: String(i + 1),
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt ?? "",
    body: "",
    category: n.category ?? "Nyheder",
    publishedAt: n.publishedAt,
    imageUrl: n.imageUrl ?? "",
    isDraft: false,
  }));
}

export function saveArticles(articles: NewsArticle[]) {
  localStorage.setItem("clubhub:nyheder", JSON.stringify(articles));
}

export default function NyhederAdminPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = loadArticles();
    setArticles(data);
    setLoaded(true);
  }, []);

  function handleDelete(id: string) {
    if (!confirm("Slet denne nyhed?")) return;
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    saveArticles(updated);
  }

  if (!loaded) {
    return <div className="text-club-muted text-body-sm">Indlæser…</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-heading-md font-heading text-secondary mb-1">Nyheder</h1>
          <p className="text-club-muted text-body-sm">
            {articles.length} artikel{articles.length !== 1 ? "er" : ""} ·{" "}
            {articles.filter((a) => a.isDraft).length} kladde
            {articles.filter((a) => a.isDraft).length !== 1 ? "r" : ""}
          </p>
        </div>
        <Link
          href="/admin/nyheder/ny"
          className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
        >
          + Ny nyhed
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-xl border border-club-border p-10 text-center">
          <p className="text-club-muted text-body-sm mb-4">Ingen nyheder endnu.</p>
          <Link
            href="/admin/nyheder/ny"
            className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
          >
            Opret den første nyhed
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-club-border overflow-hidden">
          <table className="w-full text-body-sm">
            <thead className="bg-surface border-b border-club-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide">
                  Titel
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide hidden sm:table-cell">
                  Kategori
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide hidden md:table-cell">
                  Dato
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-club-border">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-surface transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/nyheder/${article.id}`}
                      className="font-medium text-secondary hover:underline line-clamp-1"
                    >
                      {article.title}
                    </Link>
                    {article.excerpt && (
                      <p className="text-club-muted text-xs mt-0.5 line-clamp-1">
                        {article.excerpt}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-club-muted hidden sm:table-cell">
                    {article.category}
                  </td>
                  <td className="px-4 py-3 text-club-muted hidden md:table-cell">
                    {new Date(article.publishedAt).toLocaleDateString("da-DK")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        article.isDraft
                          ? "bg-amber-50 text-amber-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {article.isDraft ? "Kladde" : "Publiceret"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/nyheder/${article.id}`}
                      className="text-xs text-secondary hover:underline mr-3"
                    >
                      Rediger
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(article.id)}
                      className="text-xs text-result-loss hover:underline"
                    >
                      Slet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-body-sm text-club-muted">
        Bemærk: Ændringer gemmes i browseren. Permanent lagring kræver en backend-integration.
      </p>
    </div>
  );
}
