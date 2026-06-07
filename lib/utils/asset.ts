export function getAssetUrl(uuid: string): string {
  return `/api/assets/${encodeURIComponent(uuid)}`;
}
