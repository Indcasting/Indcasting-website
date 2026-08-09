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
    const parsed = new URL(url, 'https://dummy.com');
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return url;
    }
  } catch {
    return '#';
  }
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

  // Block protocol-relative URLs (//...) and external schemes
  if (path.startsWith('//') || !path.startsWith('/')) {
    return fallback;
  }

  // Block any path containing '.' in a suspicious way (prevents ./malicious or ../malicious tricks)
  if (path.includes('.') && !path.startsWith('/.')) {
    return fallback;
  }

  return path;
}
