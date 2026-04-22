import { fetchPosts } from "@/lib/wordpress";
import BentoGrid from "@/components/BentoGrid";

export default async function PostsPage() {
  const posts = await fetchPosts(20); // Fetch more posts for the listing page

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          All Articles
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl">
          Explore our collection of stories, news, and insights from across the globe.
        </p>
      </header>

      <BentoGrid posts={posts} />
    </div>
  );
}
