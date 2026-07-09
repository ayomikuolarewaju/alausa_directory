type ScheduleRow = {
  day: string;
  firstTrain: string;
  lastTrain: string;
  frequency: string;
};

type Props = {
  schedule: ScheduleRow[];
  color: string;
  title?: string;
};

export default function ScheduleTable({ schedule, color, title = "Service Schedule" }: Props) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
      <div className="px-5 py-4" style={{ background: color }}>
        <h3 className="font-display font-bold text-white text-lg">🕐 {title}</h3>
      </div>
      <div className="bg-white divide-y divide-gray-100">
        <div className="grid grid-cols-4 px-5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400"
          style={{ background: "#FAFAF5" }}>
          <span>Day</span>
          <span>First</span>
          <span>Last</span>
          <span>Frequency</span>
        </div>
        {schedule.map((row, i) => (
          <div key={i} className="grid grid-cols-4 px-5 py-3 text-sm items-center">
            <span className="font-semibold">{row.day}</span>
            <span className="font-mono font-bold" style={{ color }}>{row.firstTrain}</span>
            <span className="font-mono font-bold" style={{ color }}>{row.lastTrain}</span>
            <span className="text-xs text-gray-500">{row.frequency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
