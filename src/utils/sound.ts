export async function playNotificationSound() {
  try {
    const audio = new Audio("/notification.mp3");
    audio.volume = 0.1; // Set volume to 10%
    await audio.play();

    //wait for the sound to finish playing
    return new Promise<void>((resolve) => {
      audio.onended = () => {
        resolve();
      };
    });
  } catch (error) {
    console.error("Error playing sound:", error);
  }
} 