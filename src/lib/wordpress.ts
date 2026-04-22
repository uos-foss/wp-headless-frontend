const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://jusmedia.co.uk/index.php?rest_route=/wp/v2";

function getUrl(path: string) {
  const separator = WP_URL.includes("?") ? "&" : "?";
  return `${WP_URL}${path}${separator}`;
}

export async function fetchPosts(perPage = 10, page = 1) {
  const res = await fetch(`${getUrl("/posts")}_embed&per_page=${perPage}&page=${page}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${getUrl("/posts")}_embed&slug=${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
  const posts = await res.json();
  return posts[0];
}

export async function fetchPages() {
  const res = await fetch(`${getUrl("/pages")}_embed`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch pages: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function fetchPageBySlug(slug: string) {
  const res = await fetch(`${getUrl("/pages")}_embed&slug=${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch page: ${res.status} ${res.statusText}`);
  const pages = await res.json();
  return pages[0];
}
