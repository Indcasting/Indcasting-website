import { CastingPost } from "@/types/casting";
import { cache } from "./cache";

const STORAGE_KEY = "casting_posts";
const CACHE_KEY = "casting_posts_list";

export function getPosts(): CastingPost[] {
  if (typeof window === "undefined") return [];

  // 1. Try to get from cache first
  const cached = cache.get<CastingPost[]>(CACHE_KEY);
  if (cached) return cached;

  // 2. "Call the server" (simulated by reading raw storage)
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  const posts = JSON.parse(data);

  // 3. Store in cache for next time (e.g., for 5 minutes)
  cache.set(CACHE_KEY, posts, 5);

  return posts;
}

export function savePosts(posts: CastingPost[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(posts)
  );
  cache.remove(CACHE_KEY);
}

export function addPost(post: CastingPost) {

  const posts = getPosts();

  posts.unshift(post);

  savePosts(posts);
}

export function deletePost(id: string) {

  const posts = getPosts().filter(
    post => post.id !== id
  );

  savePosts(posts);
}

export function updatePost(updated: CastingPost) {

  const posts = getPosts().map(post =>

    post.id === updated.id
      ? updated
      : post

  );

  savePosts(posts);
}