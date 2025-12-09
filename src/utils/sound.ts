type SoundType = "work"|"break";

const soundFiles: Record<SoundType, string> = {
  work: "/Doruaga_clear.mp3",
  break: "/Doruaga_TresureBoxGet.mp3",
};

export async function playNotificationSound(type: SoundType) {
  try {
    const audio = new Audio(soundFiles[type]);
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


// Video Game Music: https://downloads.khinsider.com/game-soundtracks/album/the-tower-of-druaga-original-soundtrack/01.%2520Credit%2520Sound.mp3
