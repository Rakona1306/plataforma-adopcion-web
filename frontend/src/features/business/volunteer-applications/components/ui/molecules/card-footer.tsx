import { CertificationTag } from "../atoms/certification-tag";
import { UrgencyTag } from "../atoms/urgency-tag";

interface CardFooterProps {
  isCertificated: boolean;
  urgency?: string;
  urgencyStyles: Record<string, string>;
}

export function CardFooter({
  isCertificated,
  urgency,
  urgencyStyles,
}: CardFooterProps) {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/30 pt-5">
      <CertificationTag isCertificated={isCertificated} />
      <UrgencyTag urgency={urgency} urgencyStyles={urgencyStyles} />
    </div>
  );
}
