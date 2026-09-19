interface CertificationTagProps {
  isCertificated: boolean;
}

export function CertificationTag({ isCertificated }: CertificationTagProps) {
  if (isCertificated) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Certificado oficial
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Sin certificación
    </span>
  );
}
