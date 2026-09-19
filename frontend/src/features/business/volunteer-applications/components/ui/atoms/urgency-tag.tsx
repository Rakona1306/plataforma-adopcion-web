interface UrgencyTagProps {
  urgency?: string;
  urgencyStyles: Record<string, string>;
}

export function UrgencyTag({ urgency, urgencyStyles }: UrgencyTagProps) {
  if (!urgency) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        urgencyStyles[urgency] ?? "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {urgency}
    </span>
  );
}
