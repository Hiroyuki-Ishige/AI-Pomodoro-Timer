import { cn } from '@/lib/utils';
import { Mode } from './TimerApp';
interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  mode: Mode;
}

export function TimerDisplay({ minutes, seconds, mode }: TimerDisplayProps) {
  return (
    <div className={cn("text-6xl font-mono font-bold text-primary",
      mode === "work" ? "text-red-500" : "text-black")}>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}

export default TimerDisplay;
