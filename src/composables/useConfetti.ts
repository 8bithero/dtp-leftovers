import confetti from 'canvas-confetti';
import { reactive, ref } from 'vue';

export function useConfetti() {
  const pop = ref(false);
  const position = reactive({ x: 0.5, y: 0.5 });

  const pew = (particleRatio: number, opts: any) => {
    const defaults = { origin: { y: position.y, x: position.x } };

    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(200 * particleRatio),
      })
    );
  };

  const fire = () => {
    pew(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    pew(0.2, {
      spread: 60,
    });
    pew(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    pew(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    pew(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return {
    fire,
    pop,
    position,
  };
}
