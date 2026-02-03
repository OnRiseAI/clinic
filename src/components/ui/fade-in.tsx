'use client'

import { m, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInProps extends HTMLMotionProps<'div'> {
    delay?: number
    duration?: number
    viewport?: { once?: boolean; margin?: string }
}

export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    viewport = { once: true, margin: '-50px' },
    ...props
}: FadeInProps) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={cn(className)}
            {...props}
        >
            {children}
        </m.div>
    )
}

export function FadeInStagger({
    children,
    className,
    faster = false,
    ...props
}: HTMLMotionProps<'div'> & { faster?: boolean }) {
    return (
        <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ staggerChildren: faster ? 0.1 : 0.2 }}
            className={cn(className)}
            {...props}
        >
            {children}
        </m.div>
    )
}
