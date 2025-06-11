import { cn } from "../../lib/utils";

interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    anchor?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export const BorderBeam = ({
    className,
    size = 200,
    duration = 15,
    anchor = 90,
    borderWidth = 1.5,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
    delay = 0,
}: BorderBeamProps) => {
    return (
        <div
            style={
                {
                    "--size": size,
                    "--duration": duration,
                    "--anchor": anchor,
                    "--border-width": borderWidth,
                    "--color-from": colorFrom,
                    "--color-to": colorTo,
                    "--delay": `-${delay}s`,
                } as React.CSSProperties
            }
            className={cn(
                "absolute inset-[0] rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
                // mask styles
                "[background:linear-gradient(transparent,transparent),linear-gradient(var(--angle,90deg),var(--color-from),var(--color-to))]",
                "[background-clip:padding-box,border-box]",
                // animated styles
                "[background-size:calc(100%-2px),calc(var(--size)*1px)]",
                "[background-position:50%_50%,calc(var(--anchor)*1%)]",
                "[background-repeat:no-repeat]",
                "[animation:border-beam_calc(var(--duration)*1s)_infinite_linear_var(--delay,0s)]",
                className,
            )}
        />
    );
};
