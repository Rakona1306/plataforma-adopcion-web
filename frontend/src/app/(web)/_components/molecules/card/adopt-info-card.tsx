import { AdoptInfoItem } from "@/core/shared/utils/web/data/adopt-info.data";


export default function AdoptInfoCard({ Icon, title, description, phaseText }: AdoptInfoItem) {
  return (
    <div className="p-4 py-10 bg-white rounded-lg border-2 border-secondary/40 h-full hover:shadow-sm hover:shadow-black/10 hover:border-secondary hover:translate-y-0.5 transition-all duration-300 cursor-default">
      <span className="text-secondary font-medium">{phaseText}</span>
      { Icon && <Icon className="text-primary w-10 h-10 text-5xl mt-2" /> }
      <h3 className="font-bold text-2xl text-slate-800 mt-4">{title}</h3>
      <p className="text-gray-500 mt-4">{description}</p>
    </div>
  )
}