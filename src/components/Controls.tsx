import { Button } from "./ui/button";
import { Mode } from "./TimerApp";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

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
      <div className="flex  flex-col gap-6 items-center">
        <Button
          onClick={onStart}
          variant="default"
          className={`w-full font-bold py-6 px-8 rounded hover:scale-110 transition-transform duration-200 cursor-pointer ${
            isRunning
              ? "bg-gray-300 hover:bg-black"
              : "bg-gray-500 hover:bg-black"
          }`}
        >
          <span className="flex items-center gap-2">
            {isRunning ? <Pause /> : <Play />}
            {isRunning ? "Pause" : "Start"}
          </span>
        </Button>
        <div className="flex w-full max-w-xs gap-4">
          <Button
            onClick={onReset}
            variant="secondary"
            className={`w-1/2 font-bold py-6 px-8 rounded hover:scale-110 transition-transform duration-200 cursor-pointer group ${
              isRunning
                ? "bg-gray-700 hover:bg-black text-white"
                : "bg-gray-100 text-black hover:bg-black hover:text-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-200" />
              Reset
            </span>
          </Button>
          <Button
            onClick={onSwitchMode}
            variant="ghost"
            className="w-1/2 text-muted-foreground font-normal py-6 px-8 rounded  hover:bg-gray-100 hover:text-foreground hover:scale-110 transition-transform duration-100 cursor-pointer"
          >
            <span>
              <Timer className="w-5 h-5 inline-block mr-2" />
              {mode === "work" ? "Switch to Break" : "Switch to Work"}
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Controls;
