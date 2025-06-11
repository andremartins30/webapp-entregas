import React from "react";
import { cn } from "../../lib/utils";

interface ShimmerProps {
    children: React.ReactNode;
    className?: string;
    shimmerWidth?: number;
}

export const Shimmer: React.FC<ShimmerProps> = ({
    children,
    className,
    shimmerWidth = 100,
}) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-lg border bg-background p-4",
                className
            )}
        >
            <div
                className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                    width: `${shimmerWidth}%`,
                }}
            />
            {children}
        </div>
    );
};
