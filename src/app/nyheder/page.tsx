import Link from "next/link";
import { clubConfig } from "@/config/club.config";
import { dummyNews } from "@/lib/dbu/dummy-data";
import { notFound } from "next/navigation";

export default function NyhederPage() {
  if (!clubConfig.features.news) return notFound();

  return (
    <>
      <section className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-display-lg font-heading font-bold">Nyheder</h1>
          <p className="text-body-sm text-white/70 mt-2">
            <Link href="/" className="hover:text-accent transition-colors">Forside</Link>
            {" / Nyheder"}
          </p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyNews.map((article, i) => (
            <Link
              key={i}
              href={`/nyheder/${article.slug}`}
              className="bg-surface border border-club-border rounded-lg overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <img src={clubConfig.logoPath} alt="" className="w-12 h-12 opacity-40" />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <span className="inline-block bg-primary text-secondary text-body-sm font-bold px-2 py-0.5 rounded w-fit">
                  {article.category}
                </span>
                <h3 className="text-heading-sm font-semibold line-clamp-2">{article.title}</h3>
                {article.excerpt && (
                  <p className="text-body-sm text-club-muted line-clamp-2">{article.excerpt}</p>
                )}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-body-sm text-club-muted">{article.publishedAt}</span>
                  <span className="text-body-sm text-secondary font-medium">Læs mere →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
