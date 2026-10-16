import { useEffect, useRef, useState, type PointerEvent } from 'react';

const clamp = (value: number) => Math.max(-25, Math.min(25, value));

/** Keep transient pointer frames outside React; commit the final angle for the range control. */
export function useConsoleDrag(onGrab: () => void) {
  const [angle, setAngle] = useState(-13);
  const device = useRef<HTMLDivElement>(null);
  const current = useRef(-13);
  const frame = useRef(0);
  const gesture = useRef<{
    id: number;
    x: number;
    angle: number;
    lastX: number;
    time: number;
    velocity: number;
  } | null>(null);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function paint(value: number) {
    current.current = clamp(value);
    device.current?.style.setProperty('--device-angle', current.current + 'deg');
  }
  function settle() {
    device.current?.removeAttribute('data-dragging');
    setAngle(Math.round(current.current));
  }
  function change(value: number) {
    cancelAnimationFrame(frame.current);
    gesture.current = null;
    paint(value);
    settle();
  }
  function down(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    cancelAnimationFrame(frame.current);
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      angle: current.current,
      lastX: event.clientX,
      time: event.timeStamp,
      velocity: 0,
    };
    device.current?.setAttribute('data-dragging', 'true');
    event.currentTarget.setPointerCapture(event.pointerId);
    onGrab();
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    drag.velocity = Math.max(
      -0.12,
      Math.min(
        0.12,
        ((event.clientX - drag.lastX) * 0.22) / Math.max(8, event.timeStamp - drag.time),
      ),
    );
    drag.lastX = event.clientX;
    drag.time = event.timeStamp;
    paint(drag.angle + (event.clientX - drag.x) * 0.22);
  }
  function finish(event: PointerEvent<HTMLButtonElement>) {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    gesture.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (event.type !== 'pointerup' || reduced || event.timeStamp - drag.time > 90) {
      settle();
      return;
    }
    let velocity = drag.velocity;
    let previous = performance.now();
    const started = previous;
    function coast(now: number) {
      const elapsed = Math.min(32, now - previous);
      previous = now;
      velocity *= Math.pow(0.85, elapsed / 16);
      paint(current.current + velocity * elapsed);
      if (now - started < 350 && Math.abs(velocity) > 0.003 && Math.abs(current.current) < 25)
        frame.current = requestAnimationFrame(coast);
      else settle();
    }
    frame.current = requestAnimationFrame(coast);
  }
  return {
    angle,
    device,
    change,
    handle: {
      onPointerDown: down,
      onPointerMove: move,
      onPointerUp: finish,
      onPointerCancel: finish,
      onLostPointerCapture: finish,
    },
  };
}
