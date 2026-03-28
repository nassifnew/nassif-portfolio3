const workImages = import.meta.glob(
  "/src/assets/work/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
)

function normalize(path = "") {
  return path
    .replace(/^\.?\/*src\/assets\//, "")
    .replace(/^\/?src\/assets\//, "")
    .replace(/^\/+/, "")
}

export function resolveWorkImage(path) {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://")) return path

  const normalized = normalize(path)
  const key = `/src/assets/${normalized}`

  return workImages[key] || ""
}
