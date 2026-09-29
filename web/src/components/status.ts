export const STATUSES = [
  "wishlist",
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
] as const;

export type Status = (typeof STATUSES)[number];

export const statusConfig: Record<Status, { label: string; dot: string; tint: string }> = {
  wishlist: {
    label: "Wishlist",
    dot: "bg-status-wishlist",
    tint: "bg-status-wishlist/10 text-status-wishlist",
  },
  applied: {
    label: "Applied",
    dot: "bg-status-applied",
    tint: "bg-status-applied/10 text-status-applied",
  },
  screening: {
    label: "Screening",
    dot: "bg-status-screening",
    tint: "bg-status-screening/10 text-status-screening",
  },
  interviewing: {
    label: "Interviewing",
    dot: "bg-status-interviewing",
    tint: "bg-status-interviewing/10 text-status-interviewing",
  },
  offer: { label: "Offer", dot: "bg-status-offer", tint: "bg-status-offer/10 text-status-offer" },
  rejected: {
    label: "Rejected",
    dot: "bg-status-rejected",
    tint: "bg-status-rejected/10 text-status-rejected",
  },
  withdrawn: {
    label: "Withdrawn",
    dot: "bg-status-withdrawn",
    tint: "bg-status-withdrawn/10 text-status-withdrawn",
  },
};

export function toDateInputValue(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function fromDateInputValue(value: string): Date | null {
  return value ? new Date(value) : null;
}
