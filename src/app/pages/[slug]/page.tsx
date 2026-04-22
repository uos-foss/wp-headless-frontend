import { fetchPageBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 py-12 max-w-4xl">
      <header className="mb-12">
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />
      </header>

      <div 
        className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </article>
  );
}
