import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0, raf;

    function handleMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }

    function tick() {
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    }

    const hoverSelector = 'a, button, [data-hoverable]';
    function handleOver(e) {
      if (e.target.closest(hoverSelector)) document.body.classList.add('hov');
    }
    function handleOut(e) {
      if (e.target.closest(hoverSelector)) document.body.classList.remove('hov');
    }

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
