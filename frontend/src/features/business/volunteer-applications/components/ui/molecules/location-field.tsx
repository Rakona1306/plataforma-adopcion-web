import { FaMapMarkerAlt } from "react-icons/fa";

interface LocationFieldProps {
  address?: string;
  googleMapLinkAddress?: string;
}

export function LocationField({ address }: LocationFieldProps) {
  if (!address) return null;

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex flex-row gap-2 text-sm leading-relaxed text-slate-50 md:text-base items-center">
        <FaMapMarkerAlt size={20} className="text-terciary" />
        <h4 className="text-xs font-medium">Ubicación</h4>
      </div>
      {address && (
        <p className="text-sm leading-relaxed text-terciary md:text-base">
          {address}
        </p>
      )}
    </div>
  );
}
