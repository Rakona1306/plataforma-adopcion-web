interface Props {
  label: string;
  value?: string | null;
}

export default function SectionName({ label, value }: Props) {
  return (
    <>
      <p className="text-slate-500 text-sm">{label}</p>
      <p className="font-bold text-slate-900">{value ?? "-"}</p>
    </>
  );
}
