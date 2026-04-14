"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import NewsArticleForm from "@/components/admin/NewsArticleForm";
import type { NewsArticle } from "@/app/admin/nyheder/page";

export default function EditNyhedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [article, setArticle] = useState<NewsArticle | null | undefined>(
    undefined
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem("clubhub:nyheder");
      if (stored) {
        const articles = JSON.parse(stored) as NewsArticle[];
        const found = articles.find((a) => a.id === id);
        setArticle(found ?? null);
      } else {
        setArticle(null);
      }
    } catch {
      setArticle(null);
    }
  }, [id]);

  if (article === undefined) {
    return <div className="text-club-muted text-body-sm">Indlæser…</div>;
  }

  if (article === null) {
    return (
      <div className="max-w-2xl">
        <Link
          href="/admin/nyheder"
          className="text-body-sm text-club-muted hover:text-secondary transition-colors"
        >
          ← Nyheder
        </Link>
        <p className="mt-4 text-club-muted text-body-sm">
          Artiklen blev ikke fundet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/admin/nyheder"
          className="text-body-sm text-club-muted hover:text-secondary transition-colors"
        >
          ← Nyheder
        </Link>
        <h1 className="text-heading-md font-heading text-secondary mt-2 mb-1">
          Rediger nyhed
        </h1>
        <p className="text-club-muted text-body-sm line-clamp-1">{article.title}</p>
      </div>
      <NewsArticleForm mode="edit" initial={article} articleId={id} />
    </div>
  );
}
