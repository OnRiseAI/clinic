"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface BlogSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function BlogSection({
  children,
  delay = 0,
  className = "",
}: BlogSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start visible so SSR and initial client render match
  const [animReady, setAnimReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset to hidden, then let IntersectionObserver reveal
    setVisible(false);
    setAnimReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        animReady
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
