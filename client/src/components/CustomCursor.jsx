import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 12;

function CustomCursor({ theme = "dark" }) {
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const targetRef = useRef({ x: -100, y: -100 });
  const positionsRef = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })));

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    let frameId = 0;

    function animate() {
      const points = positionsRef.current;

      points[0].x += (targetRef.current.x - points[0].x) * 0.25;
      points[0].y += (targetRef.current.y - points[0].y) * 0.25;

      for (let index = 1; index < points.length; index += 1) {
        points[index].x += (points[index - 1].x - points[index].x) * 0.32;
        points[index].y += (points[index - 1].y - points[index].y) * 0.32;
      }

      setTrail(points.map((point) => ({ x: point.x, y: point.y })));
      frameId = window.requestAnimationFrame(animate);
    }

    function onMove(event) {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <>
      {trail.map((dot, index) => {
        const ratio = 1 - index / TRAIL_LENGTH;
        const size = 5 + ratio * 11;
        const opacity = ratio * 0.7;
        
        // Theme-aware colors with gradient effect
        const baseColor = theme === "light" 
          ? "rgba(37, 99, 235, 1)" 
          : "rgba(34, 211, 238, 1)";
        const glowColor = theme === "light"
          ? "rgba(59, 130, 246, 0.4)"
          : "rgba(34, 211, 238, 0.4)";

        return (
          <div
            key={`cursor-dot-${index}`}
            className="pointer-events-none fixed z-80 hidden rounded-full md:block"
            style={{
              left: dot.x,
              top: dot.y,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              background: baseColor,
              boxShadow: `0 0 ${8 + ratio * 12}px ${glowColor}, 0 0 ${4 + ratio * 6}px ${baseColor}`,
              filter: `blur(${0.5 + ratio * 0.5}px)`,
              transform: "translate(-50%, -50%)",
              transition: "box-shadow 0.1s ease-out"
            }}
          />
        );
      })}
    </>
  );
}

export default CustomCursor;
