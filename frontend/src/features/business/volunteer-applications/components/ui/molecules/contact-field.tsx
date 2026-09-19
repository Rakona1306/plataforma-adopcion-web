import { FaUser } from "react-icons/fa";

interface ContactFieldProps {
  contactEmail?: string;
  contactPhone?: string;
}

export function ContactField({
  contactEmail,
  contactPhone,
}: ContactFieldProps) {
  if (!contactEmail && !contactPhone) return null;

  return (
    <div className="space-y-1.5 w-full">
      <h4 className="text-xs font-medium text-white flex gap-2 items-center">
        <FaUser size={20} className="text-terciary" />
        <span>Contacto</span>
      </h4>
      {contactEmail && (
        <a
          href={`mailto:${contactEmail}`}
          className="block truncate text-base text-white font-bold hover:underline"
        >
          {contactEmail}
        </a>
      )}
      {contactPhone && (
        <a
          href={`tel:${contactPhone}`}
          className="block text-base text-white hover:underline font-bold"
        >
          {contactPhone}
        </a>
      )}
    </div>
  );
}
