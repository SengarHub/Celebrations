#!/usr/bin/env python3
"""
Fast & High-Fidelity Polyphonic Birthday Music Generator
Uses Python standard library for exact polyphonic harmonic generation and
ffmpeg's native audio engine for studio acoustic hall reverb, stereo widening, and high-volume mastering.
"""

import math
import struct
import wave
import subprocess
import os

SAMPLE_RATE = 44100

def note_freq(semitones_from_a4):
    return 440.0 * (2.0 ** (semitones_from_a4 / 12.0))

# Chromatic notes (A4 = 0, C4 = -9, C5 = 3)
C3 = -21; Db3 = -20; D3 = -19; Eb3 = -18; E3 = -17; F3 = -16; Fs3 = -15; G3 = -14; Ab3 = -13; A3 = -12; Bb3 = -10; B3 = -9
C4 = -9;  Db4 = -8;  D4 = -7;  Eb4 = -6;  E4 = -5;  F4 = -4;  Fs4 = -3;  G4 = -2;  Ab4 = -1;  A4 = 0;   Bb4 = 2;   B4 = 3
C5 = 3;   Db5 = 4;   D5 = 5;   Eb5 = 6;   E5 = 7;   F5 = 8;   Fs5 = 9;   G5 = 10;  Ab5 = 11;  A5 = 12;  Bb5 = 14;  B5 = 15
C6 = 15;  D6 = 17;  E6 = 19;  F6 = 20;  G6 = 22

class FastAudioTrack:
    def __init__(self, duration_sec):
        self.num_samples = int(duration_sec * SAMPLE_RATE)
        self.left = [0.0] * self.num_samples
        self.right = [0.0] * self.num_samples

    def add_polyphonic_note(self, start_time, duration, freq, timbre='bell', volume=0.35, pan=0.0):
        start_idx = int(start_time * SAMPLE_RATE)
        dur_samples = min(int(duration * SAMPLE_RATE), self.num_samples - start_idx)
        if dur_samples <= 0 or start_idx >= self.num_samples:
            return

        pan_l = math.cos((pan + 1.0) * math.pi / 4.0)
        pan_r = math.sin((pan + 1.0) * math.pi / 4.0)

        dt = 1.0 / SAMPLE_RATE
        two_pi_f = 2.0 * math.pi * freq

        if timbre == 'bell':
            # Celestial Glockenspiel / Music Box Bell: 1x, 2x, 2.76x (inharmonic bell), 3x
            decay_const = 3.5 / duration
            phase1 = phase2 = phase3 = phase4 = 0.0
            dphase1 = two_pi_f * dt
            dphase2 = two_pi_f * 2.0 * dt
            dphase3 = two_pi_f * 2.756 * dt
            dphase4 = two_pi_f * 4.0 * dt

            for i in range(dur_samples):
                t = i * dt
                attack = min(1.0, t * 150.0)
                decay = math.exp(-t * decay_const)
                env = attack * decay * volume

                s = (math.sin(phase1) + 
                     0.45 * math.sin(phase2) + 
                     0.28 * math.sin(phase3) + 
                     0.15 * math.sin(phase4)) * env

                idx = start_idx + i
                self.left[idx] += s * pan_l
                self.right[idx] += s * pan_r

                phase1 += dphase1
                phase2 += dphase2
                phase3 += dphase3
                phase4 += dphase4

        elif timbre == 'piano':
            # Warm acoustic piano / epiano with rich harmonic body
            decay_const = 2.4 / duration
            phase1 = phase2 = phase3 = phase4 = 0.0
            dphase1 = two_pi_f * dt
            dphase2 = two_pi_f * 2.0 * dt
            dphase3 = two_pi_f * 3.0 * dt
            dphase4 = two_pi_f * 4.0 * dt

            for i in range(dur_samples):
                t = i * dt
                attack = min(1.0, t * 90.0)
                decay = math.exp(-t * decay_const)
                env = attack * decay * volume

                s = (math.sin(phase1) + 
                     0.55 * math.sin(phase2) + 
                     0.30 * math.sin(phase3) + 
                     0.15 * math.sin(phase4)) * env

                idx = start_idx + i
                self.left[idx] += s * pan_l
                self.right[idx] += s * pan_r

                phase1 += dphase1
                phase2 += dphase2
                phase3 += dphase3
                phase4 += dphase4

        elif timbre == 'bass':
            # Plucked acoustic acoustic bass
            decay_const = 2.2 / duration
            phase1 = phase2 = 0.0
            dphase1 = two_pi_f * dt
            dphase2 = two_pi_f * 2.0 * dt

            for i in range(dur_samples):
                t = i * dt
                attack = min(1.0, t * 80.0)
                decay = math.exp(-t * decay_const)
                env = attack * decay * volume

                s = (math.sin(phase1) + 0.35 * math.sin(phase2)) * env

                idx = start_idx + i
                self.left[idx] += s * 0.707
                self.right[idx] += s * 0.707

                phase1 += dphase1
                phase2 += dphase2

    def add_polyphonic_chord(self, start_time, duration, freqs, volume=0.22, arpeggiate_delay=0.03):
        """Polyphonic rolled chord across stereo field."""
        num = len(freqs)
        for idx, f in enumerate(freqs):
            pan = -0.45 + (idx / max(1, num - 1)) * 0.9
            offset = idx * arpeggiate_delay
            self.add_polyphonic_note(start_time + offset, max(0.2, duration - offset), f, timbre='piano', volume=volume, pan=pan)

    def add_dholak_bass(self, start_time, volume=0.45):
        start_idx = int(start_time * SAMPLE_RATE)
        dur_samples = min(int(0.22 * SAMPLE_RATE), self.num_samples - start_idx)
        if dur_samples <= 0: return

        dt = 1.0 / SAMPLE_RATE
        phase = 0.0
        for i in range(dur_samples):
            t = i * dt
            # Pitch sweep 130Hz -> 65Hz
            pitch = 130.0 * math.exp(-t * 16.0) + 65.0
            phase += 2.0 * math.pi * pitch * dt
            decay = math.exp(-t * 9.0)
            val = math.sin(phase) * decay * volume
            idx = start_idx + i
            self.left[idx] += val * 0.75
            self.right[idx] += val * 0.75

    def add_dholak_treble(self, start_time, volume=0.30):
        start_idx = int(start_time * SAMPLE_RATE)
        dur_samples = min(int(0.14 * SAMPLE_RATE), self.num_samples - start_idx)
        if dur_samples <= 0: return

        dt = 1.0 / SAMPLE_RATE
        phase = 0.0
        for i in range(dur_samples):
            t = i * dt
            pitch = 380.0 * math.exp(-t * 22.0) + 200.0
            phase += 2.0 * math.pi * pitch * dt
            noise = (math.sin(t * 98765.4) % 1.0 - 0.5) * 0.4
            decay = math.exp(-t * 20.0)
            val = (math.sin(phase) * 0.6 + noise) * decay * volume
            idx = start_idx + i
            self.left[idx] += val * 0.65
            self.right[idx] += val * 0.75

    def add_party_clap(self, start_time, volume=0.28):
        start_idx = int(start_time * SAMPLE_RATE)
        dur_samples = min(int(0.16 * SAMPLE_RATE), self.num_samples - start_idx)
        if dur_samples <= 0: return

        dt = 1.0 / SAMPLE_RATE
        for i in range(dur_samples):
            t = i * dt
            decay = math.exp(-t * 32.0)
            # Clustered clapping noise
            noise = ((math.sin((start_idx + i) * 123.456) % 1.0) - 0.5) * 2.0
            val = noise * decay * volume
            idx = start_idx + i
            self.left[idx] += val * 0.7
            self.right[idx] += val * 0.7

    def write_wav(self, filename):
        # Find peak
        max_val = 0.0001
        for i in range(self.num_samples):
            if abs(self.left[i]) > max_val: max_val = abs(self.left[i])
            if abs(self.right[i]) > max_val: max_val = abs(self.right[i])
        
        scale = 0.95 / max_val
        with wave.open(filename, 'wb') as wf:
            wf.setnchannels(2)
            wf.setsampwidth(2)
            wf.setframerate(SAMPLE_RATE)
            frames = bytearray()
            for i in range(self.num_samples):
                l_int = int(max(-32767, min(32767, self.left[i] * scale * 32767)))
                r_int = int(max(-32767, min(32767, self.right[i] * scale * 32767)))
                frames.extend(struct.pack('<hh', l_int, r_int))
            wf.writeframes(frames)


def render_mastered_mp3(raw_wav, output_mp3, output_wav):
    """
    Apply ffmpeg studio acoustic hall reverb, dynamics compression, and volume booster.
    """
    # Rich reverberation + compressor + high-energy boost
    filter_graph = (
        "aecho=0.8:0.88:40|70:0.35|0.22,"
        "acompressor=threshold=-12dB:ratio=4:attack=5:release=60,"
        "volume=1.35"
    )
    subprocess.run([
        'ffmpeg', '-y', '-i', raw_wav,
        '-af', filter_graph,
        '-codec:a', 'libmp3lame', '-b:a', '256k', output_mp3
    ], check=True)
    subprocess.run([
        'ffmpeg', '-y', '-i', raw_wav,
        '-af', filter_graph,
        output_wav
    ], check=True)


def build_polyphonic_happy_birthday():
    raw_wav = 'temp_audio/raw_polyphonic_happy_birthday.wav'
    out_mp3 = 'public/assets/audio/polyphonic_happy_birthday.mp3'
    out_wav = 'public/assets/audio/polyphonic_happy_birthday.wav'
    
    bpm = 126
    beat = 60.0 / bpm
    total_dur = 33.0
    track = FastAudioTrack(total_dur)
    
    # 2 joyous cycles: Verse 1 (Acoustic Chimes & Warm Chords) + Verse 2 (Grand Indian Celebration with Dholak & Claps)
    for cycle in range(2):
        t_base = cycle * 16.0 + 0.4
        is_grand = (cycle == 1)
        lead_vol = 0.40 if not is_grand else 0.46
        harm_vol = 0.24 if not is_grand else 0.28
        chord_vol = 0.22 if not is_grand else 0.26
        bass_vol = 0.35 if not is_grand else 0.42

        # Happy Birthday in F major
        melody = [
            # "Happy Birthday to you"
            (0.0, C4, 0.7, A3), (0.75, C4, 0.25, A3),
            (1.0, D4, 0.95, Bb3), (2.0, C4, 0.95, A3),
            (3.0, F4, 0.95, C4), (4.0, E4, 1.8, C4),
            
            # "Happy Birthday to you"
            (6.0, C4, 0.7, A3), (6.75, C4, 0.25, A3),
            (7.0, D4, 0.95, Bb3), (8.0, C4, 0.95, A3),
            (9.0, G4, 0.95, Bb4), (10.0, F4, 1.8, A4),
            
            # "Happy Birthday dear Varnika"
            (12.0, C4, 0.7, A3), (12.75, C4, 0.25, A3),
            (13.0, C5, 0.95, A4), (14.0, A4, 0.95, F4),
            (15.0, F4, 0.95, D4), (16.0, E4, 0.95, C4), (17.0, D4, 1.8, Bb3),
            
            # "Happy Birthday to you!"
            (19.0, Bb4, 0.7, G4), (19.75, Bb4, 0.25, G4),
            (20.0, A4, 0.95, F4), (21.0, F4, 0.95, D4),
            (22.0, G4, 0.95, C4), (23.0, F4, 2.5, A4)
        ]

        for b_off, m_note, dur, h_note in melody:
            t = t_base + b_off * beat
            d = dur * beat
            # Multi-voice lead (chime + piano)
            track.add_polyphonic_note(t, d * 1.2, note_freq(m_note), timbre='bell', volume=lead_vol, pan=0.15)
            track.add_polyphonic_note(t, d, note_freq(m_note), timbre='piano', volume=lead_vol * 0.7, pan=0.0)
            
            # Counter-melody / Harmony in 3rds/6ths
            track.add_polyphonic_note(t, d, note_freq(h_note), timbre='bell', volume=harm_vol, pan=-0.25)
            track.add_polyphonic_note(t, d, note_freq(h_note), timbre='piano', volume=harm_vol * 0.8, pan=-0.3)
            
            if is_grand:
                track.add_polyphonic_note(t, d * 0.85, note_freq(m_note + 12), timbre='bell', volume=0.20, pan=0.45)

        # Polyphonic chords & walking bass
        chords = [
            (0.0, [F3, A3, C4], F3),
            (3.0, [F3, A3, C4, F4], F3),
            (6.0, [E3, G3, Bb3, C4], C3),
            (9.0, [E3, G3, C4], C3),
            (12.0, [F3, A3, C4], F3),
            (15.0, [F3, A3, C4, Eb4], F3),
            (18.0, [D3, F3, Bb3, D4], Bb3),
            (21.0, [C3, F3, A3, C4], F3),
            (24.0, [F3, A3, C4, F4], F3)
        ]

        for b_start, c_notes, b_note in chords:
            tc = t_base + b_start * beat
            track.add_polyphonic_chord(tc, 2.8 * beat, [note_freq(n) for n in c_notes], volume=chord_vol)
            track.add_polyphonic_note(tc, 1.8 * beat, note_freq(b_note - 12), timbre='bass', volume=bass_vol)
            track.add_polyphonic_note(tc + 1.5 * beat, 1.2 * beat, note_freq(b_note - 7), timbre='bass', volume=bass_vol * 0.7)

        # Celebratory Dholak & Crowd Clapping
        for b in range(26):
            tb = t_base + b * beat
            if b % 3 == 0:
                track.add_dholak_bass(tb, volume=0.45 if is_grand else 0.32)
            elif b % 3 == 1:
                track.add_dholak_treble(tb, volume=0.32 if is_grand else 0.22)
                track.add_party_clap(tb, volume=0.26 if is_grand else 0.18)
            elif b % 3 == 2:
                track.add_dholak_treble(tb, volume=0.25 if is_grand else 0.16)
                if is_grand:
                    track.add_party_clap(tb, volume=0.20)

    track.write_wav(raw_wav)
    render_mastered_mp3(raw_wav, out_mp3, out_wav)
    print("Polyphonic Happy Birthday rendered!")


def build_baar_baar_din():
    raw_wav = 'temp_audio/raw_baar_baar_din.wav'
    out_mp3 = 'public/assets/audio/baar_baar_din_ye_aaye.mp3'
    out_wav = 'public/assets/audio/baar_baar_din_ye_aaye.wav'
    
    bpm = 124
    beat = 60.0 / bpm
    total_dur = 32.0
    track = FastAudioTrack(total_dur)
    
    for cycle in range(2):
        t_base = cycle * 15.5 + 0.4
        is_grand = (cycle == 1)

        notes = [
            (0.0, G4, 0.4, E4), (0.5, E4, 0.4, C4), (1.0, G4, 0.4, E4), (1.5, E4, 0.4, C4),
            (2.0, G4, 0.4, E4), (2.5, A4, 0.4, F4), (3.0, G4, 1.2, E4),
            (4.5, G4, 0.4, E4), (5.0, E4, 0.4, C4), (5.5, G4, 0.4, E4), (6.0, E4, 0.4, C4),
            (6.5, G4, 0.4, E4), (7.0, A4, 0.4, F4), (7.5, G4, 1.2, E4),
            (9.0, C5, 0.5, G4), (9.5, C5, 0.5, G4), (10.0, B4, 0.4, G4), (10.5, A4, 0.4, F4),
            (11.0, G4, 0.5, E4), (11.5, F4, 0.4, D4), (12.0, E4, 1.0, C4),
            (13.0, D4, 0.4, B3), (13.5, E4, 0.4, C4), (14.0, F4, 0.4, D4), (14.5, G4, 0.4, E4),
            (15.0, A4, 0.5, F4), (15.5, B4, 0.5, G4), (16.0, C5, 1.5, G4),
            (18.0, C5, 0.6, G4), (18.75, C5, 0.25, G4), (19.0, D5, 0.8, A4),
            (20.0, C5, 0.8, G4), (21.0, F5, 0.8, C5), (22.0, E5, 1.8, C5),
            (24.0, C5, 0.6, G4), (24.75, C5, 0.25, G4), (25.0, D5, 0.8, A4),
            (26.0, C5, 0.8, G4), (27.0, G5, 0.8, D5), (28.0, F5, 2.0, C5)
        ]

        for b_off, m_note, dur, h_note in notes:
            t = t_base + b_off * beat
            d = dur * beat
            track.add_polyphonic_note(t, d * 1.1, note_freq(m_note), timbre='bell', volume=0.42, pan=0.15)
            track.add_polyphonic_note(t, d, note_freq(m_note), timbre='piano', volume=0.38, pan=-0.1)
            track.add_polyphonic_note(t, d, note_freq(h_note), timbre='piano', volume=0.26, pan=-0.3)
            if is_grand:
                track.add_polyphonic_note(t, d * 0.9, note_freq(m_note + 12), timbre='bell', volume=0.22, pan=0.45)

        chords = [
            (0.0, [C3, E3, G3, C4], C3),
            (4.5, [C3, E3, G3, C4], C3),
            (9.0, [F3, A3, C4, F4], F3),
            (13.0, [G3, B3, D4, G4], G3),
            (18.0, [C3, E3, G3, C4], C3),
            (24.0, [G3, B3, D4, F4], G3),
            (28.0, [C3, E3, G3, C4], C3)
        ]

        for b_s, c_notes, b_n in chords:
            tc = t_base + b_s * beat
            track.add_polyphonic_chord(tc, 3.5 * beat, [note_freq(n) for n in c_notes], volume=0.26)
            track.add_polyphonic_note(tc, 2.0 * beat, note_freq(b_n - 12), timbre='bass', volume=0.40)
            track.add_polyphonic_note(tc + 2.0 * beat, 1.5 * beat, note_freq(b_n - 5), timbre='bass', volume=0.32)

        for b in range(30):
            tb = t_base + b * beat
            if b % 2 == 0:
                track.add_dholak_bass(tb, volume=0.42)
            else:
                track.add_dholak_treble(tb, volume=0.32)
                track.add_party_clap(tb, volume=0.24)
            track.add_dholak_treble(tb + 0.5 * beat, volume=0.20)

    track.write_wav(raw_wav)
    render_mastered_mp3(raw_wav, out_mp3, out_wav)
    print("Baar Baar Din Ye Aaye rendered!")


def build_cake_cutting():
    raw_wav = 'temp_audio/raw_cake_cutting.wav'
    out_mp3 = 'public/assets/audio/cake_cutting_celebration.mp3'
    out_wav = 'public/assets/audio/cake_cutting_celebration.wav'
    
    bpm = 132
    beat = 60.0 / bpm
    total_dur = 30.0
    track = FastAudioTrack(total_dur)
    
    fanfare_stabs = [
        (0.0, [C4, G4, C5, E5], 0.4),
        (0.6, [C4, G4, C5, E5], 0.4),
        (1.2, [F3, C4, F4, A4, C5], 0.8),
        (2.0, [G3, D4, G4, B4, D5], 1.2)
    ]
    for st, notes, dur in fanfare_stabs:
        track.add_polyphonic_chord(st, dur, [note_freq(n) for n in notes], volume=0.45)
        track.add_polyphonic_note(st, dur, note_freq(notes[0] - 12), timbre='bass', volume=0.52)
        track.add_dholak_bass(st, volume=0.55)
        track.add_party_clap(st, volume=0.35)

    t_start = 3.5
    for cycle in range(2):
        t_base = t_start + cycle * 12.5
        notes = [
            (0.0, G4, 0.4, E4), (0.5, G4, 0.25, E4), (0.75, A4, 0.6, F4),
            (1.5, G4, 0.6, E4), (2.25, C5, 0.7, G4), (3.0, B4, 1.2, G4),
            (4.5, G4, 0.4, E4), (5.0, G4, 0.25, E4), (5.25, A4, 0.6, F4),
            (6.0, G4, 0.6, E4), (6.75, D5, 0.7, A4), (7.5, C5, 1.2, G4),
            (9.0, G4, 0.4, E4), (9.5, G4, 0.25, E4), (9.75, G5, 0.8, E5),
            (10.5, E5, 0.6, C5), (11.25, C5, 0.6, G4), (12.0, B4, 0.6, G4), (12.75, A4, 1.2, F4),
            (14.25, F5, 0.4, D5), (14.75, F5, 0.25, D5), (15.0, E5, 0.6, C5),
            (15.75, C5, 0.6, G4), (16.5, D5, 0.7, A4), (17.25, C5, 2.0, G4)
        ]
        
        for b_off, m_note, dur, h_note in notes:
            t = t_base + b_off * beat
            d = dur * beat
            track.add_polyphonic_note(t, d * 1.2, note_freq(m_note), timbre='bell', volume=0.46, pan=0.2)
            track.add_polyphonic_note(t, d, note_freq(m_note), timbre='piano', volume=0.42, pan=-0.1)
            track.add_polyphonic_note(t, d, note_freq(h_note), timbre='piano', volume=0.28, pan=-0.3)
            track.add_polyphonic_note(t, d * 0.9, note_freq(m_note + 12), timbre='bell', volume=0.24, pan=0.5)

        for b in range(22):
            tb = t_base + b * beat
            if b % 2 == 0:
                track.add_dholak_bass(tb, volume=0.45)
            else:
                track.add_dholak_treble(tb, volume=0.35)
                track.add_party_clap(tb, volume=0.28)
            track.add_dholak_treble(tb + 0.5 * beat, volume=0.22)

    track.write_wav(raw_wav)
    render_mastered_mp3(raw_wav, out_mp3, out_wav)
    print("Cake cutting celebration rendered!")


if __name__ == '__main__':
    os.makedirs('public/assets/audio', exist_ok=True)
    os.makedirs('temp_audio', exist_ok=True)
    
    print("Rendering high-volume polyphonic birthday tracks...")
    build_polyphonic_happy_birthday()
    build_baar_baar_din()
    build_cake_cutting()
    print("All polyphonic celebration audio tracks successfully built!")
