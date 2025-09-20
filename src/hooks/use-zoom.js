import { useCallback, useEffect, useState } from "react";

export function useZoom({ min = 0.1, max = 10, step = 0.1 } = {}) {
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        const isMac = navigator.platform.toUpperCase().includes("MAC");

        const handleKeyDown = (e) => {
            const isCmd = isMac ? e.metaKey : e.ctrlKey;

            if (!isCmd) return;

            if (e.key === "+" || e.key === "=") {
                e.preventDefault();
                setZoom((prev) => Math.min(prev + step, max));
            }

            if (e.key === "-" || e.key === "_") {
                e.preventDefault();
                setZoom((prev) => Math.max(prev - step, min));
            }

            if (e.key === "0") {
                e.preventDefault();
                setZoom(1);
            }
        };

        const handleWheel = (e) => {
            const isCmd = isMac ? e.metaKey : e.ctrlKey;

            if (!isCmd) return;

            e.preventDefault();

            if (e.deltaY < 0) {
                setZoom((prev) => Math.min(prev + step, max));
            } else if (e.deltaY > 0) {
                setZoom((prev) => Math.max(prev - step, min));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("wheel", handleWheel);
        };
    }, [min, max, step]);

    const addZoom = useCallback(() => {
        setZoom((prev) => Math.min(prev + step, max));
    }, [max, step]);

    const subZoom = useCallback(() => {
        setZoom((prev) => Math.max(prev - step, min));
    }, [min, step]);

    return { zoom, setZoom, addZoom, subZoom };
}
