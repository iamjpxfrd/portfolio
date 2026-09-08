type ClockWidgetProps = { time: string; dateLong: string };

export function ClockWidget({ time, dateLong }: ClockWidgetProps) {
  return (
    <div className="clock-widget">
      <div className="clock-time">{time}</div>
      <div className="clock-date">{dateLong}</div>
    </div>
  );
}
