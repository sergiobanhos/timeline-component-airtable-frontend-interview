import { TimelineItem } from "./timeline-item";
import { getEventWidth } from "../../../timelineUtils.js";
import { useZoom } from "../../../hooks/use-zoom.js";
import { TimelineProvider, useTimeline } from "./timeline-context";
import { Button } from "../button";
import { PlusIcon, MinusIcon } from "lucide-react";

export function Timeline({ items, onItemsChange }) {
    return (
        <TimelineProvider items={items} onItemsChange={onItemsChange}>
            <TimelineMain />
        </TimelineProvider>
    )
}

function TimelineMain() {
    return (
        <div className="w-full h-full relative">
            <main className="overflow-x-auto overflow-y-hidden h-[75%]" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e1 #f1f5f9'
            }}>
                <div className="min-w-full">
                    <TimelineDateMarkers />
                    <TimelineEvents />
                </div>
            </main>

            <TimelineFooter />
        </div>
    )
}

function TimelineDateMarkers() {
    const {
        dateMarkers,
        pixelsPerDay,
        aggrupateWeeks,
        getDateLabel,
        timelineWidth
    } = useTimeline();

    return (
        <div className="flex flex-row" style={{ width: `${timelineWidth}px` }}>
            {
                dateMarkers.map((date, index) => (
                    <div
                        key={index}
                        style={{ width: `${pixelsPerDay * (aggrupateWeeks ? 7 : 1)}px` }}
                        className="flex flex-col justify-center items-center border p-4 text-center"
                    >
                        <p>{getDateLabel(date)}</p>
                        {
                            (
                                <p className="text-xs text-muted-foreground">{new Date(date).getFullYear()}</p>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

function TimelineEvents() {
    const {
        lanes,
        timelineWidth,
        laneHeight,
        getPositionForDate,
        pixelsPerDay,
        laneGap,
    } = useTimeline();

    return (
        <div className="relative" style={{ width: `${timelineWidth}px` }}>
            {
                lanes.map((lane, index) => (
                    <div
                        key={index}
                        className="relative w-full border-b"
                        style={{
                            height: `${laneHeight}px`,
                            backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#E5E5E5",
                        }}
                    >
                        {lane.map((event) => (
                            <div
                                key={event.id}
                                className="absolute"
                                style={{
                                    left: `${getPositionForDate(event.start)}px`,
                                    top: "4px",
                                    width: `${getEventWidth(event, pixelsPerDay)}px`,
                                    height: `${laneHeight - 8}px`,
                                    padding: "4px",
                                }}
                            >
                                <TimelineItem event={event} />
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}


function TimelineFooter() {
    const { zoom, addZoom, subZoom, items, lanes } = useTimeline();

    const totalDuration = () => {
        if (items.length === 0) return 0;
        const sortedEvents = [...items].sort((a, b) => new Date(a.start) - new Date(b.start));
        const minDate = new Date(sortedEvents[0].start);
        const maxDate = new Date(sortedEvents[sortedEvents.length - 1].end);
        return Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
    };

    return (
        <footer className="sticky bottom-0 z-10 bg-white border-t border-gray-200 p-4">
            <div className="flex flex-row justify-between items-start gap-8">
                <div className="flex flex-row gap-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold text-gray-700">Statistics</h3>
                        <div className="flex flex-row gap-6 text-sm">
                            <div className="flex flex-col">
                                <span className="text-gray-500">Total Events</span>
                                <span className="font-medium text-gray-800">{items.length}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Lanes</span>
                                <span className="font-medium text-gray-800">{lanes.length}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Duration</span>
                                <span className="font-medium text-gray-800">{totalDuration()} days</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold text-gray-700">Zoom Controls</h3>
                        <div className="flex flex-row gap-2 items-center">
                            <Button variant="outline" size="sm" onClick={subZoom}>
                                <MinusIcon className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium min-w-[3rem] text-center">{zoom.toFixed(1)}x</span>
                            <Button variant="outline" size="sm" onClick={addZoom}>
                                <PlusIcon className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">Use Ctrl + Scroll to zoom</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-gray-700">Instructions</h3>
                    <div className="text-xs text-gray-500 space-y-1">
                        <p>• Double-click event name to edit</p>
                        <p>• Drag edges to resize events</p>
                        <p>• Ctrl + Scroll to zoom in/out</p>
                        <p>• Data auto-saves to localStorage</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
