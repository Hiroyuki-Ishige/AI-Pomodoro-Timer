"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import TimerDisplay from "./TimerDisplay";
import { Controls } from "./Controls";
import { useState, useEffect } from "react";
import { useReward } from "react-rewards";
import { playNotificationSound } from "@/utils/sound";
import MetadataUpdator from "./MetadataUpdator";
import { Switch } from "@/components/ui/switch";
import { time } from "console";
import { generateRefreshSuggestion } from "@/utils/gemini";
import RefreshSuggestion from "./RefreshSuggestion";

export type Mode = "work" | "break"; // Define Mode type by union type

export function TimerApp() {
  // Confetti reward setup
  const { reward: confetti, isAnimating } = useReward(
    "confettiReward",
    "balloons",
    {
      zIndex: 9999,
      lifetime: 300,
      angle: 270,
      spread: 200,
      startVelocity: 45,
      elementCount: 50,
      decay: 0.9,
    }
  );

  // State to track if timer is running
  const [isRunning, setIsRunning] = useState(false);

  //Control work duration
  const [workDuration, setWorkDuration] = useState(20);

  //Control break duration
  const [breakDuration, setBreakDuration] = useState(5);

  // State to track time left
  const [timeLeft, setTimeLeft] = useState({
    minutes: workDuration,
    seconds: 0,
  });

  // state to track current mode
  const [mode, setMode] = useState<Mode>("work");

  // set auto timer mode
  const [autoStart, setAutoStart] = useState(false);

  // Set refresh suggestion state
  const [refreshSuggestion, setRefreshSuggestion] = useState<string | null>(
    null
  );

  // change mode
  const toggleMode = () => {
    // Toggle between 'work' and 'break' modes
    const newMode: Mode = mode === "work" ? "break" : "work";
    setMode(newMode);
    // reset timer after toggling mode
    setTimeLeft({
      minutes: newMode === "work" ? workDuration : breakDuration,
      seconds: 0,
    });
    // set timer to show pause.
    setIsRunning(autoStart);

    // Handle message from Gemini API at break start
    if (newMode === "break") {
      generateRefreshSuggestion().then((suggestion) => {
        setRefreshSuggestion(suggestion);
      });
    }
  };

  // Handle start/pause button click
  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  // Handle reset button click
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft({
      minutes: mode === "work" ? workDuration : breakDuration,
      seconds: 0,
    });
  };

  //=======================useEffect Section=========

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
            void playNotificationSound(mode); // Play sound when timer ends
            if (mode === "work") {
              void confetti(); // Trigger confetti animation
            }

            setTimeout(() => {
              // Ensure state updates after sound plays
              toggleMode();
            }, 100); // Slight delay to ensure sound plays before mode switch

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

  //Check API call to gemini when component mounts
  useEffect(() => {
    const testGeminiAPI = async () => {
      try {
        const suggestion = await generateRefreshSuggestion();
        console.log("Gemini API suggestion:", suggestion);
      } catch (error) {
        console.error("Error testing Gemini API:", error);
      }
    };
    void testGeminiAPI();
  }, []);
  //=======================End of useEffect=========

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative">
      <span
        id="confettiReward"
        className="fixed top-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-50 absolute"
      />{" "}
      {/* Container for confetti reward */}
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

        {/* Work Duration Selector */}
        <CardFooter className="flex justify-center gap-6 items-center">
          <label className="text-sm font-medium">Work Duration</label>
          <select
            value={workDuration}
            onChange={(e) => {
              const newDuration = parseInt(e.target.value);
              setWorkDuration(newDuration);
              if (mode === "work" && !isRunning) {
                setTimeLeft({ minutes: newDuration, seconds: 0 });
              }
            }}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {[15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((duration) => (
              <option key={duration} value={duration}>
                {duration} min
              </option>
            ))}
          </select>
        </CardFooter>

        {/* Break Duration Selector */}
        <CardFooter className="flex justify-center gap-6 items-center">
          <label className="text-sm font-medium">Break Duration</label>
          <select
            value={breakDuration}
            onChange={(e) => {
              const newDuration = parseInt(e.target.value);
              setBreakDuration(newDuration);
              if (mode === "break" && !isRunning) {
                setTimeLeft({ minutes: newDuration, seconds: 0 });
              }
            }}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {[5, 10, 15, 20, 25, 30].map((duration) => (
              <option key={duration} value={duration}>
                {duration} min
              </option>
            ))}
          </select>
        </CardFooter>

        {/* Auto Start Mode Selector */}
        <CardFooter className="flex justify-center gap-6 items-center">
          <label className="text-sm font-medium">Auto Start Mode</label>
          <Switch
            checked={autoStart}
            onCheckedChange={() => setAutoStart(!autoStart)}
            className="cursor-pointer"
          />
        </CardFooter>
        <MetadataUpdator
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
          mode={mode}
        />
      </div>
      <RefreshSuggestion
        suggestion={refreshSuggestion}
        onClose={() => setRefreshSuggestion(null)}
      />
    </div>
  );
}

export default TimerApp;
