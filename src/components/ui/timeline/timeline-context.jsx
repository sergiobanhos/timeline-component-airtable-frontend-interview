import React, { createContext, useContext, useMemo, useState } from "react";
import { useZoom } from "../../../hooks/use-zoom";
import { assignLanes } from "../../../assignLanes.js";
import { format, addDays } from "date-fns";

const TimelineContext = createContext(null);

export function TimelineProvider({ items, onItemsChange, children }) {
    const { zoom, addZoom, subZoom } = useZoom();

    const updateEventStart = (id, start) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, start } : item
        );
        onItemsChange?.(updatedItems);
    };

    const updateEventEnd = (id, end) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, end } : item
        );
        onItemsChange?.(updatedItems);
    };

    const updateEventName = (id, name) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, name } : item
        );
        onItemsChange?.(updatedItems);
    };

    const lanes = assignLanes(items);

    const sortedEvents = [...items].sort(
        (a, b) => new Date(a.start) - new Date(b.start)
    );

    const minDate = new Date(sortedEvents[0].start);
    const maxDate = new Date(sortedEvents[sortedEvents.length - 1].end);

    const totalDays =
        Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;

    const pixelsPerDay = 256 * zoom;
    const timelineWidth = totalDays * pixelsPerDay;
    const laneHeight = 80;
    const laneGap = laneHeight;

    const range = maxDate.getTime() - minDate.getTime();
    const step = range / 120;

    const aggrupateWeeks = zoom < 0.3;

    const generateDateMarkers = () => {
        const markers = [];
        const current = new Date(minDate);

        while (current <= maxDate) {
            markers.push(new Date(current));
            current.setDate(current.getDate() + (aggrupateWeeks ? 7 : 1));
        }

        return markers;
    };

    const getPositionForDate = (date) => {
        const daysDiff = Math.floor(
            (new Date(date) - minDate) / (1000 * 60 * 60 * 24)
        );
        return daysDiff * pixelsPerDay;
    };

    const getDateLabel = (date) => {
        if (aggrupateWeeks) {
            const start = addDays(new Date(date), 1);
            const end = addDays(start, 7);
            return `${format(start, "dd MMM")} - ${format(
                end,
                "dd MMM"
            )}`;
        }

        return format(addDays(new Date(date), 1), "dd MMM");
    };

    const dateMarkers = generateDateMarkers();

    const value = {
        items,
        lanes,
        updateEventStart,
        updateEventEnd,
        updateEventName,
        zoom,
        timelineWidth,
        laneHeight,
        laneGap,
        step,
        aggrupateWeeks,
        pixelsPerDay,
        dateMarkers,
        addZoom,
        subZoom,
        getPositionForDate,
        getDateLabel,
    };

    const memoizedValue = useMemo(() => value, [JSON.stringify(value)]);

    return (
        <TimelineContext.Provider value={memoizedValue}>
            {children}
        </TimelineContext.Provider>
    );
}

export function useTimeline() {
    const ctx = useContext(TimelineContext);
    if (!ctx) {
        throw new Error("useTimeline must be used within a TimelineProvider");
    }
    return ctx;
}
