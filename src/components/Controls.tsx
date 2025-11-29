import { Button } from "./ui/button";
import { Mode } from "./TimerApp";

interface ControlsProps {
  onStart: () => void;
  onReset: () => void;
  onSwitchMode: () => void;
  isRunning: boolean;
  mode: Mode;
}

export function Controls({
  onStart,
  onReset,
  isRunning,
  mode,
  onSwitchMode,
}: ControlsProps) {
  return (
    <>
      <div className="flex gap-6">
        <Button
          onClick={onStart}
          variant="default"
          className=" font-bold py-6 px-8 rounded hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={onReset}
          variant="secondary"
          className=" font-bold py-6 px-8 rounded hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          Reset
        </Button>
      </div>
      <div className="mt-8">
        <Button
          onClick={onSwitchMode}
          variant="ghost"
          className=" text-muted-foreground font-normal py-6 px-8 rounded  hover:bg-gray-100 hover:text-foreground hover:scale-110 transition-transform duration-100 cursor-pointer"
        >
          {mode === "work" ? "Switch to Break" : "Switch to Work"}
        </Button>
      </div>
    </>
  );
}

export default Controls;
