/**
 * Validates if a URL is safe to use in an href attribute.
 * Blocks javascript: and data: schemes to prevent XSS.
 *
 * @param url The URL string to validate.
 * @returns The original URL if safe, otherwise a safe fallback (e.g., '#').
 */
export function validateUrl(url: string, fallback = '#'): string {
  if (!url) return fallback;

  try {
    // Use the URL constructor to normalize and parse the URL
    // For relative URLs, we provide a dummy base to ensure parsing works
    const parsed = new URL(url, 'https://dummy.com');

    // Only allow http: and https: protocols
    // This explicitly blocks 'javascript:', 'data:', 'vbscript:', etc.
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return url;
    }
  } catch (e) {
    // If URL parsing fails, it's either a relative path or an invalid URL.
    // We allow relative paths (start with /) but block everything else.
    if (url.startsWith('/') && !url.startsWith('//')) {
      return url;
    }
  }

  return fallback;
}

/**
 * Validates if a redirect path is internal.
 * Prevents open redirects to external domains.
 *
 * @param path The redirect path from a query parameter.
 * @returns The path if it is an internal relative link, otherwise a default fallback.
 */
export function validateInternalPath(path: string | null, fallback = '/dashboard'): string {
  if (!path) return fallback;

  // Internal paths must start with '/' and MUST NOT start with '//' (which is a protocol-relative external URL)
  // We also block backslashes to prevent bypasses in some browsers.
  if (path.startsWith('/') && !path.startsWith('//') && !path.includes('\\')) {
    return path;
  }

  return fallback;
}
