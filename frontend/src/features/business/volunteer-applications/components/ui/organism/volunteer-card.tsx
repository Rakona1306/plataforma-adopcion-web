import { VolunteerApplicationResponse } from "../../../dto/volunter-application-response";
import { Card, CardContent } from "@/app/(web)/_components/molecules/card/card";
import { CardHeader } from "../molecules/card-header";
import { CardTextField } from "../molecules/card-text-field";
import { AgeRangeBlock } from "../molecules/agerange-block";
import { LocationField } from "../molecules/location-field";
import { DateRangeBlock } from "../molecules/daterange-block";
import { ContactField } from "../molecules/contact-field";
import { CardFooter } from "../molecules/card-footer";
import { Divider } from "@mantine/core";
import { BsGoogle } from "react-icons/bs";

interface VolunteerCardProps {
  application: VolunteerApplicationResponse;
  urgencyStyles: Record<string, string>;
}

export function VolunteerCard({
  application,
  urgencyStyles,
}: VolunteerCardProps) {
  const {
    title,
    subtitle,
    description,
    requirements,
    minAge,
    maxAge,
    address,
    googleMapLinkAddress,
    startDate,
    endDate,
    contactEmail,
    contactPhone,
    isCertificated,
    urgency,
  } = application;

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-primary/15 p-4 bg-white transition-all duration-300 hover:border-primary/50 rounded-2xl hover:shadow-lg shadow-slate-800 relative hover:-translate-y-1">
      <CardContent className="flex h-full flex-col gap-6 p-6 md:p-8 bg-primary rounded-2xl">
        <CardHeader title={title} subtitle={subtitle} />

        <CardFooter
          isCertificated={isCertificated}
          urgency={urgency}
          urgencyStyles={urgencyStyles}
        />

        <div className="space-y-5 pt-5">
          <CardTextField label="Descripción" content={description} />
          <CardTextField label="Requisitos" content={requirements} />
        </div>

        <DateRangeBlock startDate={startDate} endDate={endDate} />

        <AgeRangeBlock minAge={minAge || 0} maxAge={maxAge || 0} />

        <div className="flex flex-row gap-5">
          <LocationField
            address={address}
            googleMapLinkAddress={googleMapLinkAddress}
          />
          <ContactField
            contactEmail={contactEmail}
            contactPhone={contactPhone}
          />
        </div>

        {googleMapLinkAddress && (
          <a
            href={googleMapLinkAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center shadow-sm shadow-black font-medium text-primary underline-offset-4 hover:underline gap-2 bg-terciary px-6 py-3 rounded-2xl justify-center"
          >
            <BsGoogle size={25} />
            <span className="font-bold">Dirección en Google Map</span>
          </a>
        )}

        <Divider />

        <div className="flex flex-row gap-5 w-full">
          <button className="w-full rounded-2xl bg-white text-slate-800 py-3 px-6 cursor-pointer hover:bg-slate-100 transition-all duration-300 active:scale-95 shadow-sm shadow-black">
            <span className="font-bold">Mas informacion</span>
          </button>
          <button className="w-full bg-terciary text-white rounded-2xl py-3 px-6 cursor-pointer hover:bg-terciary/90 transition-all duration-300 active:scale-95 shadow-sm shadow-black">
            <span className="font-bold">Postular ahora</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
