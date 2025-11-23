"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TimerApp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Timer App</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-6xl font-mono">
          10:00
          {/* Timer app implementation goes here */}
        </CardContent>
      </Card>
    </div>
  );
}

export default TimerApp;
