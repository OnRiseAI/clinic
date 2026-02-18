"use client";

import Image from "next/image";
import { clsx } from "clsx";

interface BlogEditorialImageProps {
    src: string;
    alt: string;
    caption?: string;
    credit?: string;
    figureLabel?: string;
    aspectRatio?: "video" | "wide" | "square" | "portrait";
    className?: string;
    priority?: boolean;
}

export default function BlogEditorialImage({
    src,
    alt,
    caption,
    credit,
    figureLabel = "FIGURE",
    aspectRatio = "video",
    className,
    priority = false,
}: BlogEditorialImageProps) {

    const aspectClasses = {
        video: "aspect-video",
        wide: "aspect-[21/9]",
        square: "aspect-square",
        portrait: "aspect-[3/4]",
    };

    return (
        <figure className={clsx("my-section-sm w-full block", className)}>
            {/* Image Container */}
            <div
                className={clsx(
                    "relative overflow-hidden w-full bg-neutral-100",
                    "rounded-md shadow-card border border-neutral-200",
                    aspectClasses[aspectRatio]
                )}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, 780px"
                    className="object-cover saturate-[0.85] contrast-[1.05]"
                />

                {/* Structural Inner Scrim - Minimal containment */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-md pointer-events-none" />
            </div>

            {/* Editorial Caption - The "Metadata" */}
            {(caption || credit) && (
                <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pl-3 border-l border-neutral-200">

                    {/* Label: Technical/Scientific/Index feel */}
                    <span className="shrink-0 font-mono text-[10px] uppercase text-neutral-400 tracking-widest select-none opacity-80">
                        {figureLabel}
                    </span>

                    <div className="flex flex-col gap-1">
                        {/* Main Caption: Serif, authoritative, normal style */}
                        {caption && (
                            <span className="font-blog-serif text-sm text-neutral-700 leading-relaxed">
                                {caption}
                            </span>
                        )}

                        {/* Credit: Minimalist Source */}
                        {credit && (
                            <span className="font-blog-sans text-[10px] text-neutral-400 tracking-wide uppercase">
                                Source: {credit}
                            </span>
                        )}
                    </div>
                </figcaption>
            )}
        </figure>
    );
}
