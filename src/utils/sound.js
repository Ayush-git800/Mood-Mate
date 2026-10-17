/**
 * Ambient Audio & Chime Utility using native Web Audio API
 * Zero external audio file dependencies. Works 100% offline and locally.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a warm, melodic coin earning chime
 */
export function playCoinSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Two-tone bright chime (B5 -> E6)
    [987.77, 1318.51].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.36);
    });
  } catch (e) {
    console.debug('Audio playback note:', e);
  }
}

/**
 * Play a gentle grounding Tibetan singing bowl tone (432Hz)
 */
export function playSingingBowlTone() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, now); // Natural resonant healing tone

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  } catch (e) {
    console.debug('Audio playback note:', e);
  }
}

/**
 * Breathing pacer inhale/exhale guidance chime
 */
export function playBreathCue(type = 'inhale') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startFreq = type === 'inhale' ? 320 : 480;
    const targetFreq = type === 'inhale' ? 480 : 320;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.52);
  } catch (e) {
    console.debug('Audio playback note:', e);
  }
}

/**
 * Ambient Soundscapes generator (Rain, Forest Breeze, Tibetan Drone)
 */
let ambientNodes = null;

export function toggleAmbientSound(soundType, isPlaying) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    // Stop current if active
    if (ambientNodes) {
      try {
        ambientNodes.gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        setTimeout(() => {
          if (ambientNodes && ambientNodes.sources) {
            ambientNodes.sources.forEach(s => {
              try { s.stop(); } catch (_) {}
            });
            ambientNodes = null;
          }
        }, 450);
      } catch (_) {
        ambientNodes = null;
      }
      if (!isPlaying) return false;
    }

    if (!isPlaying) return false;

    // Create soothing pink noise / binaural drone
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Filter to shape into gentle rain or forest wind
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = soundType.includes('rain') ? 800 : 450;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2);

    noiseSource.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    noiseSource.start();
    ambientNodes = { gain: masterGain, sources: [noiseSource] };
    return true;
  } catch (e) {
    console.debug('Ambient sound start error:', e);
    return false;
  }
}
