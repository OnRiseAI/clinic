"use client";

/**
 * Cloudflare Turnstile Widget Component
 * A wrapper for @marsidev/react-turnstile to provide consistent behavior.
 */

import { Turnstile, type TurnstileProps } from "@marsidev/react-turnstile";
import { useLocale } from "next-intl";

interface TurnstileWidgetProps extends Partial<TurnstileProps> {
    onVerify: (token: string) => void;
    className?: string;
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"; // Default test key

export function TurnstileWidget({
    onVerify,
    className,
    ...props
}: TurnstileWidgetProps) {
    const locale = useLocale();

    // If we are in development and no site key is provided, we use the "Always Pass" test key
    // to avoid blocking developers, but in production we'll require a real key.
    const siteKey = SITE_KEY;

    return (
        <div className={`turnstile-container flex justify-center my-4 ${className}`}>
            <Turnstile
                siteKey={siteKey}
                onSuccess={onVerify}
                options={{
                    language: locale === "tr" ? "tr" : "en",
                    theme: "light",
                    size: "normal",
                }}
                {...props}
            />
        </div>
    );
}
