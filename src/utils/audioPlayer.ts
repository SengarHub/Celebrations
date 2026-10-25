/**
 * High-Volume Indian Birthday Celebration Music Player & Synthesizer.
 * Built specifically for Indian birthday cake-cutting celebrations with high-energy
 * dholak beats, festive brass fanfare, crowd claps, and volume booster capabilities.
 */

import { triggerPushpaVarsha } from './confettiHelper';

export interface BirthdayTrack {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  icon: string;
  src?: string;
  isSynth?: boolean;
}

export const BIRTHDAY_TRACKS: BirthdayTrack[] = [
  {
    id: 'polyphonic-happy-birthday',
    title: 'Polyphonic Happy Birthday Song',
    hindiTitle: 'पॉलीफ़ोनिक हैप्पी बर्थडे टू यू · केक कटिंग स्पेशल',
    description: 'Rich polyphonic chime & piano harmony with festive Indian celebration beats & claps',
    icon: '🎂',
    src: '/assets/audio/polyphonic_happy_birthday.mp3'
  },
  {
    id: 'baar-baar-din',
    title: 'Baar Baar Din Ye Aaye',
    hindiTitle: 'बार-बार दिन यह आए · अमर भारतीय जन्मदिन गीत',
    description: 'The iconic Indian birthday anthem with festive brass, dholak beats & claps',
    icon: '🎉',
    src: '/assets/audio/baar_baar_din_ye_aaye.mp3'
  },
  {
    id: 'cake-cutting',
    title: 'Cake Cutting Celebration Fanfare',
    hindiTitle: 'हैप्पी बर्थडे टू यू · हाई-एनर्जी केक कटिंग धोलक बीट्स',
    description: 'High-energy celebration fanfare with joyful Indian party percussion',
    icon: '🥳',
    src: '/assets/audio/cake_cutting_celebration.mp3'
  },
  {
    id: 'lullaby',
    title: 'Raag Bhupali Lullaby',
    hindiTitle: 'राग भूपाली लोरी · शांत भारतीय शास्त्रीय धुन',
    description: 'Gentle acoustic chimes & tanpura drone for quiet reflection',
    icon: '🪔',
    isSynth: true
  }
];

export interface AudioPlayerState {
  playing: boolean;
  currentTrackId: string;
  volume: number; // 0.0 to 1.5
  isBoosted: boolean;
}

class BirthdayCelebrationPlayer {
  private audioCtx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private isPlaying = false;
  private currentTrackId = 'polyphonic-happy-birthday';
  private volume = 1.0; // High volume preset (100%)
  private isBoosted = false;

  // Lullaby synth properties
  private synthTimer: number | null = null;
  private synthStep = 0;
  private synthMasterGain: GainNode | null = null;
  private synthDroneGain: GainNode | null = null;

  // Raag Bhupali frequencies in Hz (C4 base)
  private readonly notes = [
    261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25
  ];
  private readonly melodyPattern = [
    0, 2, 3, 4, 3, 2, 0, 1, 2, 4, 5, 4, 3, 2, 0, -1,
    2, 3, 5, 4, 3, 2, 1, 0, 2, 4, 3, 1, 0, -1
  ];

  // Callback subscribers
  private subscribers: Array<(state: AudioPlayerState, playing: boolean) => void> = [];

  constructor() {
    // Audio will initialize upon user action
  }

  public subscribe(cb: (stateOrPlaying: AudioPlayerState | boolean, playing?: boolean) => void) {
    const wrapped = (state: AudioPlayerState, playing: boolean) => {
      // Support both signatures: cb(state) or cb(playing)
      if (typeof cb === 'function') {
        cb(state, playing);
      }
    };
    this.subscribers.push(wrapped);
    // Initial emission
    cb(this.getState(), this.isPlaying);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== wrapped);
    };
  }

  private notify() {
    const state = this.getState();
    for (const sub of this.subscribers) {
      try {
        sub(state, this.isPlaying);
      } catch {
        // ignore subscriber errors
      }
    }
  }

  public getState(): AudioPlayerState {
    return {
      playing: this.isPlaying,
      currentTrackId: this.currentTrackId,
      volume: this.volume,
      isBoosted: this.isBoosted
    };
  }

  public getCurrentTrack(): BirthdayTrack {
    return BIRTHDAY_TRACKS.find(t => t.id === this.currentTrackId) || BIRTHDAY_TRACKS[0];
  }

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      // Dynamics compressor: prevents harsh clipping at high volume
      this.compressor = this.audioCtx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.audioCtx.currentTime);
      this.compressor.knee.setValueAtTime(8, this.audioCtx.currentTime);
      this.compressor.ratio.setValueAtTime(4.5, this.audioCtx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.audioCtx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.audioCtx.currentTime);

      this.gainNode = this.audioCtx.createGain();
      this.updateEffectiveGain();

      this.gainNode.connect(this.compressor);
      this.compressor.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private updateEffectiveGain() {
    if (!this.gainNode || !this.audioCtx) return;
    const effectiveVol = this.isBoosted ? Math.min(1.5, this.volume * 1.4) : this.volume;
    const now = this.audioCtx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.linearRampToValueAtTime(Math.max(0.001, effectiveVol), now + 0.05);
  }

  private initAudioElement(src: string) {
    this.initAudioContext();
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';

      if (this.audioCtx && this.gainNode) {
        try {
          this.sourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
          this.sourceNode.connect(this.gainNode);
        } catch {
          // If already connected or not supported, audio element fallback works directly
        }
      }
    }

    if (this.audioElement.src !== window.location.origin + src && !this.audioElement.src.endsWith(src)) {
      this.audioElement.src = src;
    }
  }

  // --- Synth Lullaby (Raag Bhupali) ---
  private startSynthDrone() {
    if (!this.audioCtx || !this.gainNode) return;
    const droneFreqs = [130.81, 196.00, 261.63];
    this.synthDroneGain = this.audioCtx.createGain();
    this.synthDroneGain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    this.synthDroneGain.connect(this.gainNode);

    droneFreqs.forEach((freq) => {
      if (!this.audioCtx || !this.synthDroneGain) return;
      const osc = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.connect(filter);
      filter.connect(this.synthDroneGain);
      osc.start();
    });
  }

  private playSynthChime(freq: number) {
    if (!this.audioCtx || !this.gainNode) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const chimeGain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    chimeGain.gain.setValueAtTime(0.001, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(chimeGain);
    chimeGain.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 2.1);
  }

  private tickSynth = () => {
    if (!this.isPlaying || this.currentTrackId !== 'lullaby') return;
    const noteIdx = this.melodyPattern[this.synthStep % this.melodyPattern.length];
    if (noteIdx >= 0 && noteIdx < this.notes.length) {
      this.playSynthChime(this.notes[noteIdx]);
    }
    this.synthStep++;
    this.synthTimer = window.setTimeout(this.tickSynth, 950);
  };

  private stopSynth() {
    if (this.synthTimer) {
      clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }

  // --- Public Playback Controls ---

  public play(trackId?: string) {
    if (trackId && trackId !== this.currentTrackId) {
      this.currentTrackId = trackId;
    }

    const track = this.getCurrentTrack();
    this.initAudioContext();
    this.isPlaying = true;
    this.updateEffectiveGain();

    if (track.isSynth) {
      if (this.audioElement) {
        this.audioElement.pause();
      }
      this.stopSynth();
      this.startSynthDrone();
      this.tickSynth();
    } else if (track.src) {
      this.stopSynth();
      this.initAudioElement(track.src);
      if (this.audioElement) {
        this.audioElement.play().catch(() => {
          // User interaction policy
        });
      }
    }

    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynth();
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setTrack(trackId: string) {
    const wasPlaying = this.isPlaying;
    this.currentTrackId = trackId;
    if (wasPlaying) {
      this.play(trackId);
    } else {
      this.notify();
    }
  }

  public setVolume(newVolume: number) {
    this.volume = Math.max(0.0, Math.min(1.5, newVolume));
    if (this.volume > 1.0) {
      this.isBoosted = true;
    } else if (this.volume <= 1.0 && this.isBoosted && newVolume < 1.0) {
      this.isBoosted = false;
    }
    this.updateEffectiveGain();
    this.notify();
  }

  public toggleBoost(): boolean {
    this.isBoosted = !this.isBoosted;
    if (this.isBoosted) {
      this.volume = 1.25;
    } else {
      this.volume = 1.0;
    }
    this.updateEffectiveGain();
    this.notify();
    return this.isBoosted;
  }

  /**
   * High Volume Indian Birthday Cake Cutting Celebration Trigger!
   * Automatically switches to the celebratory birthday track, sets volume to High/Boost,
   * plays immediately, and showers auspicious flower petals!
   */
  public celebrateCakeCutting() {
    this.currentTrackId = 'polyphonic-happy-birthday';
    this.isBoosted = true;
    this.volume = 1.35;
    this.play('polyphonic-happy-birthday');
    triggerPushpaVarsha();
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const celebrationPlayer = new BirthdayCelebrationPlayer();
// Backward compatible alias
export const lullabyPlayer = celebrationPlayer;
