import confetti from 'canvas-confetti';

/**
 * Triggers a traditional Indian "Pushpa Varsha" (shower of fragrant flowers: marigold orange, golden yellow, rose pink, and auspicious vermilion).
 */
export function triggerPushpaVarsha() {
  const colors = ['#F59E0B', '#F97316', '#EF4444', '#EC4899', '#FEF08A', '#FCD34D'];

  // Left burst
  confetti({
    particleCount: 45,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.2,
    ticks: 200,
    gravity: 0.8
  });

  // Right burst
  confetti({
    particleCount: 45,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.2,
    ticks: 200,
    gravity: 0.8
  });

  // Gentle center rain of petals
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.1 },
      colors: ['#F59E0B', '#E11D48', '#FDE047'],
      shapes: ['circle'],
      scalar: 1.4,
      gravity: 0.6,
      drift: 0.1
    });
  }, 250);
}

export function triggerSparkles() {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#F59E0B', '#D97706', '#FCD34D'],
    scalar: 0.9
  });
}
