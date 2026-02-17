"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
// Ensure you have access to clsx or just use template literals if preferred
import { clsx } from "clsx";

interface BlogSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string; // Allow custom spacing helpers
}

export default function BlogSection({
  children,
  delay = 0,
  className = "",
}: BlogSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-20px" } // Deliberate trigger
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={clsx(
        "mb-section-sm lg:mb-section-md transition-all duration-1000 ease-[cubic-bezier(0.2,1,0.4,1)]",
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)", // Reduced movement distance for subtlety
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </section>
  );
}
