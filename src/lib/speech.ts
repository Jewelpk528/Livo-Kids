/**
 * Utility for speech synthesis with consistent English voice selection.
 */
export const speak = (text: string, rate = 0.9, pitch = 1.4) => {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  
  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a high-quality English female voice
    const englishVoice = 
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google'))) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Handle async voice loading
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      speakText();
      window.speechSynthesis.onvoiceschanged = null; // Clean up
    };
  } else {
    speakText();
  }
};
