"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimerDisplay from "./TimerDisplay";
import { Controls } from "./Controls";
import { useState, useEffect } from "react";
import { playNotificationSound } from "@/utils/sound";

export type Mode = "work" | "break"; // Define Mode type by union type

export function TimerApp() {
  // State to track if timer is running
  const [isRunning, setIsRunning] = useState(false);

  // State to track time left
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 3 });

  // state to track current mode
  const [mode, setMode] = useState<Mode>("work");

  // change mode
  const toggleMode = () => {
    // Toggle between 'work' and 'break' modes
    const newMode: Mode = mode === "work" ? "break" : "work";
    setMode(newMode);
    // reset timer after toggling mode
    setTimeLeft({
      minutes: newMode === "work" ? 25 : 5,
      seconds: 0,
    });
    // set timer to show pause.
    setIsRunning(false);
  };

  // Handle start/pause button click
  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  // Handle reset button click
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft({
      minutes: mode === "work" ? 25 : 5,
      seconds: 0,
    });
  };

  //Set up timer interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          // Check if timer has reached zero
          if (prev.minutes === 0 && prev.seconds === 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            void playNotificationSound();// Play sound when timer ends
            toggleMode(); // Switch mode when timer ends
            console.log("Timer finished");
            return prev;
          }
          // Handle countdown logic
          if (prev.seconds === 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          }
          // Otherwise, just decrease seconds
          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1); // now 1 but should be 1000 in production
    }
    // Cleanup function - this runs when effect is cleaned up
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="flex flex-col items-center space-y-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {mode === "work" ? "Work Mode" : "Break Mode"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <TimerDisplay
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds}
              mode={mode}
            />
          </CardContent>
        </Card>

        <Controls
          onStart={handleStart}
          onReset={handleReset}
          onSwitchMode={toggleMode}
          isRunning={isRunning}
          mode={mode}
        />
      </div>
    </div>
  );
}

export default TimerApp;
