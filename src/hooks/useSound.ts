const SOUNDS = {
  pop: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  sparkle: 'https://assets.mixkit.co/active_storage/sfx/1074/1074-preview.mp3'
};

export const useSound = () => {
  const playSound = (name: keyof typeof SOUNDS) => {
    const audio = new Audio(SOUNDS[name]);
    audio.currentTime = 0;
    audio.volume = 0.4;
    audio.play().catch(err => console.log('Sound blocked by browser policy:', err));
  };

  return { playSound };
};
