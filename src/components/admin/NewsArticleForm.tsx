"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NewsArticle } from "@/app/admin/nyheder/page";
import { saveArticles } from "@/app/admin/nyheder/page";

function loadArticles(): NewsArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("clubhub:nyheder");
    if (stored) return JSON.parse(stored) as NewsArticle[];
  } catch {
    // ignore
  }
  return [];
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-semibold text-secondary mb-1">
        {label}
        {required && <span className="text-result-loss ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
      />
    </div>
  );
}

function TextArea({
  label,
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-semibold text-secondary mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition resize-y"
      />
    </div>
  );
}

interface Props {
  mode: "create" | "edit";
  initial?: Partial<NewsArticle>;
  articleId?: string;
}

export default function NewsArticleForm({ mode, initial, articleId }: Props) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    body: initial?.body ?? "",
    category: initial?.category ?? "Nyheder",
    publishedAt: initial?.publishedAt ?? today,
    imageUrl: initial?.imageUrl ?? "",
    isDraft: initial?.isDraft ?? false,
  });
  const [saved, setSaved] = useState(false);

  function set<K extends keyof typeof form>(key: K) {
    return (value: (typeof form)[K]) => {
      setSaved(false);
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/æ/g, "ae")
      .replace(/ø/g, "oe")
      .replace(/å/g, "aa")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(v: string) {
    set("title")(v);
    if (!form.slug || form.slug === autoSlug(form.title)) {
      set("slug")(autoSlug(v));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const articles = loadArticles();

    if (mode === "create") {
      const newArticle: NewsArticle = {
        id: String(Date.now()),
        ...form,
      };
      const updated = [newArticle, ...articles];
      saveArticles(updated);
      router.push("/admin/nyheder");
    } else {
      const updated = articles.map((a) =>
        a.id === articleId ? { ...a, ...form } : a
      );
      saveArticles(updated);
      setSaved(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="bg-white rounded-xl border border-club-border p-6 space-y-5">
        <h2 className="text-heading-sm font-heading text-secondary">Indhold</h2>
        <Field
          label="Titel"
          id="title"
          value={form.title}
          onChange={handleTitleChange}
          placeholder="Vorbasse vinder 4-2 mod Billund"
          required
        />
        <Field
          label="Slug (URL)"
          id="slug"
          value={form.slug}
          onChange={set("slug")}
          placeholder="vorbasse-vinder-4-2-mod-billund"
          required
        />
        <TextArea
          label="Resumé (uddrag)"
          id="excerpt"
          value={form.excerpt}
          onChange={set("excerpt")}
          placeholder="Kort beskrivelse der vises i listevisningen…"
          rows={2}
        />
        <TextArea
          label="Brødtekst"
          id="body"
          value={form.body}
          onChange={set("body")}
          placeholder="Artikel-indhold…"
          rows={8}
        />
      </div>

      <div className="bg-white rounded-xl border border-club-border p-6 space-y-5">
        <h2 className="text-heading-sm font-heading text-secondary">Metadata</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Kategori"
            id="category"
            value={form.category}
            onChange={set("category")}
            placeholder="Nyheder 2026"
          />
          <Field
            label="Publiceringsdato"
            id="publishedAt"
            type="date"
            value={form.publishedAt}
            onChange={set("publishedAt")}
            required
          />
        </div>
        <Field
          label="Billede-URL (valgfri)"
          id="imageUrl"
          value={form.imageUrl}
          onChange={set("imageUrl")}
          placeholder="https://…"
        />
      </div>

      <div className="bg-white rounded-xl border border-club-border p-4 flex items-center gap-3">
        <input
          type="checkbox"
          id="isDraft"
          checked={form.isDraft}
          onChange={(e) => set("isDraft")(e.target.checked)}
          className="w-4 h-4 rounded border-club-border accent-secondary"
        />
        <label htmlFor="isDraft" className="text-body-sm text-club-text cursor-pointer">
          Gem som kladde (vises ikke på hjemmesiden)
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
        >
          {mode === "create" ? "Opret nyhed" : "Gem ændringer"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/nyheder")}
          className="px-5 py-2.5 rounded-lg border border-club-border text-club-text font-semibold text-body-sm hover:bg-surface transition-colors"
        >
          Annuller
        </button>
        {saved && (
          <span className="text-body-sm text-result-win font-medium">✓ Gemt</span>
        )}
      </div>

      <p className="text-body-sm text-club-muted">
        Bemærk: Ændringer gemmes i browseren. Permanent lagring kræver en backend-integration.
      </p>
    </form>
  );
}
