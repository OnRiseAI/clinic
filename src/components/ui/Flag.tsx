import React from 'react';
import * as Flags from 'country-flag-icons/react/3x2';

interface FlagProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string;
    className?: string;
}

export default function Flag({ code, className, ...props }: FlagProps) {
    const FlagComponent = (Flags as any)[code.toUpperCase()];

    if (!FlagComponent) {
        return <span className={className} {...props}>🏳️</span>; // Fallback
    }

    return <FlagComponent className={className} {...props} />;
}
