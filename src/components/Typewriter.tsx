"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export default function Typewriter({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const i = loop % texts.length;
      const fullText = texts[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoop(loop + 1);
      }
    };

    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(handleTyping, currentSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loop, texts, typeSpeed, deleteSpeed, pauseTime]);

  return <span>{text}</span>;
}
