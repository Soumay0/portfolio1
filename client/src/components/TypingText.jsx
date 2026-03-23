import { useEffect, useState } from "react";

function TypingText({ texts, speed = 90, eraseSpeed = 45, pause = 1200 }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayValue, setDisplayValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex % texts.length];
    const completed = !isDeleting && displayValue === current;
    const erased = isDeleting && displayValue === "";

    const timeout = setTimeout(
      () => {
        if (completed) {
          setIsDeleting(true);
          return;
        }

        if (erased) {
          setIsDeleting(false);
          setTextIndex((previous) => previous + 1);
          return;
        }

        const nextValue = isDeleting
          ? current.slice(0, Math.max(0, displayValue.length - 1))
          : current.slice(0, displayValue.length + 1);

        setDisplayValue(nextValue);
      },
      completed ? pause : isDeleting ? eraseSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [displayValue, eraseSpeed, isDeleting, pause, speed, textIndex, texts]);

  return <span>{displayValue}<span className="ml-1 animate-pulse">|</span></span>;
}

export default TypingText;
