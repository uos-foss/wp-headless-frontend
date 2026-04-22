"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { width: number; height: number };
    }>;
  };
}

export default function BentoGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
      {posts.map((post, index) => {
        const isLarge = index === 0;
        const isWide = index === 1 || index === 4;
        const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
        const imageUrl = featuredMedia?.source_url || "/placeholder.jpg";

        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "relative group overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
              isLarge ? "md:col-span-2 md:row-span-2" : "",
              isWide ? "md:col-span-2" : ""
            )}
          >
            <Link href={`/posts/${post.slug}`} className="block h-full w-full">
              {featuredMedia && (
                <Image
                  src={imageUrl}
                  alt={featuredMedia.alt_text || post.title.rendered}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <h3
                  className={cn(
                    "font-bold text-white leading-tight",
                    isLarge ? "text-3xl" : "text-xl"
                  )}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div
                  className="mt-2 text-zinc-300 text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
