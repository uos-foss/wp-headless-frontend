import { fetchPostBySlug } from "@/lib/wordpress";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const imageUrl = featuredMedia?.source_url;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="container mx-auto px-6 py-12 max-w-4xl">
      <Link 
        href="/" 
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 mb-12 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to articles
      </Link>

      <header className="mb-12">
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post._embedded?.author?.[0]?.name || "JUS MEDIA Team"}
          </div>
        </div>
      </header>

      {imageUrl && (
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-16 border border-zinc-200 dark:border-zinc-800">
          <Image
            src={imageUrl}
            alt={featuredMedia?.alt_text || post.title.rendered}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div 
        className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
