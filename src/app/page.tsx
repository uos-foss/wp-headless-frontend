import { fetchPosts } from "@/lib/wordpress";
import BentoGrid from "@/components/BentoGrid";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchPosts(6); // Fetch latest 6 posts

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">
            Editor's Pick
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Discover the latest in <span className="text-zinc-500">Culture</span> & Tech.
          </h1>
        </div>
        <Link 
          href="/posts" 
          className="group flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
        >
          View all articles 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <BentoGrid posts={posts} />

      <section className="mt-32 py-24 border-t border-zinc-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h3 className="text-2xl font-bold mb-6">Stay ahead of the curve</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">
              Join our community of over 50,000 readers and get the best of JUS MEDIA delivered straight to your inbox.
            </p>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-blue-600 rounded-full px-6 py-3 outline-none transition-all"
              />
              <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-12">
            <blockquote className="text-2xl italic font-serif text-zinc-800 dark:text-zinc-200 mb-6">
              "JUS MEDIA is the most refreshing take on culture and technology we've seen in years."
            </blockquote>
            <cite className="text-sm font-medium not-italic text-zinc-500">
              — The Times
            </cite>
          </div>
        </div>
      </section>
    </div>
  );
}
