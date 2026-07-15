import { useEffect } from 'react';

export function useTilt(ref, { maxY = 5, maxX = 3 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleMove(e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      el.style.transform = `perspective(1200px) rotateY(${x * maxY}deg) rotateX(${-y * maxX}deg) translateY(-4px)`;
    }

    function handleLeave() {
      el.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1)';
      el.style.transform = '';
      el.addEventListener('transitionend', () => { el.style.transition = ''; }, { once: true });
    }

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref, maxY, maxX]);
}
