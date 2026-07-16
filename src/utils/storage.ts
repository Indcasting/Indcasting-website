import { CastingPost } from "@/types/casting";

const STORAGE_KEY = "casting_posts";

export function getPosts(): CastingPost[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function savePosts(posts: CastingPost[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(posts)
  );
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