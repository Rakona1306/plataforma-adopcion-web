import { DateStat } from "../atoms/date-stat";

interface DateRangeBlockProps {
  startDate: string | Date;
  endDate: string | Date;
}

export function DateRangeBlock({ startDate, endDate }: DateRangeBlockProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <DateStat label="Inicio" date={startDate} />
      <DateStat label="Cierre" date={endDate} />
    </div>
  );
}
