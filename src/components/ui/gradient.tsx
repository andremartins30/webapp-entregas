import React from "react";
import { cn } from "../../lib/utils";

interface GradientProps {
    children: React.ReactNode;
    className?: string;
    from?: string;
    to?: string;
    direction?: "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl";
}

export const Gradient: React.FC<GradientProps> = ({
    children,
    className,
    from = "from-blue-600",
    to = "to-purple-600",
    direction = "to-r",
}) => {
    return (
        <div
            className={cn(
                "bg-gradient-to-r",
                `bg-gradient-${direction}`,
                from,
                to,
                className
            )}
        >
            {children}
        </div>
    );
};
