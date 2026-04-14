import Link from "next/link";
import NewsArticleForm from "@/components/admin/NewsArticleForm";

export default function NyNyhedPage() {
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
          Ny nyhed
        </h1>
        <p className="text-club-muted text-body-sm">
          Opret en ny nyhedsartikel til klubbens hjemmeside.
        </p>
      </div>
      <NewsArticleForm mode="create" />
    </div>
  );
}
