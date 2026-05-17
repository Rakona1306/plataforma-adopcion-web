
import { SponsorshipItem } from "@/core/shared/utils/web/data/sponsoship.data";
import Title from "../../atoms/title";

export default function SponsorshipCard({ description, img, title }: SponsorshipItem) {
  return (
    <div className="border-2 border-quaternary flex-1 rounded-lg overflow-hidden group cursor-default hover:shadow-lg hover:shadow-black/20 transition-shadow duration-300">
      <div className="w-full h-62.5 overflow-hidden">
        <img src={img} alt="" className="w-full h-62.5 object-cover group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="p-4 w-full">
        <Title htmlTag="h6" className="text-center text-lg font-bold text-primary!">{title}</Title>
        <p className="text-center text-base text-gray-500">{description}</p>
      </div>
    </div>
  )
}