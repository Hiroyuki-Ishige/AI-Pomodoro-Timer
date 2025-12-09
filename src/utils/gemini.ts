//call Gemini API to generate refresh suggestion
export async function generateRefreshSuggestion(): Promise<string> {
  try {
    //call API
    const response = await fetch("/api/refresh-suggestion");
    const data = await response.json();
    return data.suggestion;
  } catch (error) {
    console.error("Error generating refresh suggestion:", error);
    return "There is error at generating refresh suggestion.";
  }
}
