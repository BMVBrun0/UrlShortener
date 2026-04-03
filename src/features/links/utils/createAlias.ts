export const createAliasFromUrl = (value: string): string => {
  const parsed = new URL(value);
  const host = parsed.hostname.replace(/^www\./, "").split(".")[0] || "link";
  const sanitizedHost = host.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6);
  const suffix = Math.random().toString(36).slice(2, 7);

  return `${sanitizedHost || "link"}-${suffix}`;
};
