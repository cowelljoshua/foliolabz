// Prefixes a public-folder path with Vite's base URL so files resolve
// correctly whether the site is served from "/" (Netlify) or a subpath
// like "/foliolabz/" (GitHub Pages). Pass paths that live in /public.
export function asset(path) {
  if (!path) return path
  if (/^https?:\/\//.test(path)) return path // already absolute URL
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') // "" or "/foliolabz"
  return base + (path.startsWith('/') ? path : `/${path}`)
}
