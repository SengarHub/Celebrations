/**
 * Web Audio API gentle ambient Indian lullaby synthesizer.
 * Generates an ethereal, calming melody based on meditative pentatonic frequencies (Sa Re Ga Pa Dha / Raag Bhupali)
 * with a warm gentle drone and soft bells, perfect for a cozy baby family album without external audio dependencies.
 */

class LullabySynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private onStateChange?: (playing: boolean) => void;

  // Raag Bhupali frequencies in Hz (C4 base)
  private readonly notes = [
    261.63, // Sa (C4)
    293.66, // Re (D4)
    329.63, // Ga (E4)
    392.00, // Pa (G4)
    440.00, // Dha (A4)
    523.25, // Sa' (C5)
    587.33, // Re' (D5)
    659.25, // Ga' (E5)
  ];

  // A soothing sequence of intervals
  private readonly melodyPattern = [
    0, 2, 3, 4, 3, 2, 0, 1, 2, 4, 5, 4, 3, 2, 0, -1,
    2, 3, 5, 4, 3, 2, 1, 0, 2, 4, 3, 1, 0, -1
  ];

  private currentStep = 0;

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.onStateChange = cb;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.startDrone();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Create a gentle warm tanpura-like acoustic pad drone
    const droneFreqs = [130.81, 196.00, 261.63]; // C3, G3, C4
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    droneFreqs.forEach((freq) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(this.droneGain);
      osc.start();
    });
  }

  private playChime(freq: number) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm bell / music box envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  private tick = () => {
    if (!this.isPlaying || !this.ctx) return;

    const noteIdx = this.melodyPattern[this.currentStep % this.melodyPattern.length];
    if (noteIdx >= 0 && noteIdx < this.notes.length) {
      this.playChime(this.notes[noteIdx]);
    }
    this.currentStep++;

    // Step every 950ms for a slow relaxing pace
    this.timer = window.setTimeout(this.tick, 950);
  };

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0.65, now + 0.8);

    if (this.timer) clearTimeout(this.timer);
    this.tick();
    this.onStateChange?.(true);
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.6);
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.onStateChange?.(false);
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const lullabyPlayer = new LullabySynthesizer();
