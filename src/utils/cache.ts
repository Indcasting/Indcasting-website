export interface CacheItem<T> {
  value: T;
  expiry: number;
}

export const cache = {
  /**
   * Store a value in localStorage with an expiration time.
   * @param key The cache key.
   * @param value The data to store.
   * @param ttlMinutes Time to live in minutes.
   */
  set: <T>(key: string, value: T, ttlMinutes = 60) => {
    const expiry = Date.now() + ttlMinutes * 60 * 1000;
    const item: CacheItem<T> = { value, expiry };
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  },

  /**
   * Retrieve a value from cache. Returns null if not found or expired.
   */
  get: <T>(key: string): T | null => {
    const itemStr = localStorage.getItem(`cache_${key}`);
    if (!itemStr) return null;

    try {
      const item: CacheItem<T> = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }
      return item.value;
    } catch (e) {
      return null;
    }
  },

  /**
   * Remove a specific item from cache.
   */
  remove: (key: string) => {
    localStorage.removeItem(`cache_${key}`);
  },

  /**
   * Clear all items starting with the cache prefix.
   */
  clear: () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("cache_"))
      .forEach((key) => localStorage.removeItem(key));
  },
};
