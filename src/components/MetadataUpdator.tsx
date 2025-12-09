import { useEffect } from "react";
interface MetadataUpdatorProps {
  minutes: number;
  seconds: number;
  mode: "work" | "break";
}

export default function MetadataUpdator({
  minutes,
  seconds,
  mode,
}: MetadataUpdatorProps) {
  useEffect(() => {
    const modeText = mode === "work" ? "Work" : "Break";
    document.title = `${modeText} - ${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }, [minutes, seconds, mode]);

  return null; // This component does not render anything
}
