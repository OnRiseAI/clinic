'use client'

import React from 'react'

interface OpenChatWrapperProps {
    children: React.ReactNode
    className?: string
}

export function OpenChatWrapper({ children, className }: OpenChatWrapperProps) {
    return (
        <div
            className={`cursor-pointer ${className || ''}`}
            onClick={() => window.dispatchEvent(new Event('open-concierge'))}
        >
            {children}
        </div>
    )
}
