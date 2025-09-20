import { useState, useRef, useEffect } from "react";
import { useTimeline } from "./timeline-context";

export function TimelineItem({ event }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isResizing, setIsResizing] = useState(null);
    const [dragStart, setDragStart] = useState({ x: 0, originalStart: null, originalEnd: null });
    const [eventName, setEventName] = useState(event.name);
    const itemRef = useRef(null);

    const { pixelsPerDay, updateEventStart, updateEventEnd, updateEventName } = useTimeline();

    const getEventColor = (eventId) => {
        const colors = [
            '#3B82F6',
            '#10B981',
            '#8B5CF6',
            '#F59E0B',
            '#EF4444',
            '#6366F1',
            '#14B8A6',
            '#F97316',
        ];
        return colors[eventId % colors.length];
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (!isResizing) return;

            const deltaX = e.clientX - dragStart.x;
            const daysDelta = Math.round(deltaX / pixelsPerDay);

            if (isResizing === 'resize-left' && daysDelta !== 0) {
                const originalStartDate = new Date(dragStart.originalStart);
                const newStartDate = new Date(originalStartDate);
                newStartDate.setDate(newStartDate.getDate() + daysDelta);
                const newStart = newStartDate.toISOString().split('T')[0];

                if (newStartDate < new Date(event.end)) {
                    updateEventStart(event.id, newStart);
                }
            }

            if (isResizing === 'resize-right' && daysDelta !== 0) {
                const originalEndDate = new Date(dragStart.originalEnd);
                const newEndDate = new Date(originalEndDate);
                newEndDate.setDate(newEndDate.getDate() + daysDelta);
                const newEnd = newEndDate.toISOString().split('T')[0];

                if (newEndDate > new Date(event.start)) {
                    updateEventEnd(event.id, newEnd);
                }
            }
        };

        const handleGlobalMouseUp = () => {
            setIsResizing(null);
            setDragStart({ x: 0, originalStart: null, originalEnd: null });
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
            document.body.style.cursor = isResizing === 'resize-left' ? 'w-resize' : 'e-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing, dragStart, pixelsPerDay, event.id, event.start, event.end, updateEventStart, updateEventEnd]);

    const handleMouseDown = (e, action) => {
        e.preventDefault();
        e.stopPropagation();

        if (action === 'resize-left' || action === 'resize-right') {
            setIsResizing(action);
            setDragStart({
                x: e.clientX,
                originalStart: event.start,
                originalEnd: event.end
            });
        }
    };

    const handleDoubleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isResizing) {
            setIsEditing(true);
        }
    };

    const handleNameSave = () => {
        setIsEditing(false);
        if (eventName.trim() !== event.name) {
            updateEventName(event.id, eventName.trim());
        }
    };

    const handleKeyPress = (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            handleNameSave();
        } else if (e.key === 'Escape') {
            setEventName(event.name);
            setIsEditing(false);
        }
    };

    const handleInputClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            ref={itemRef}
            className={`h-full w-full rounded-md p-2 text-white text-xs font-medium shadow-sm border border-white/20 overflow-hidden relative group select-none ${isResizing ? 'z-50' : ''
                }`}
            style={{ backgroundColor: getEventColor(event.id) }}
            title={`${event.name}\n${event.start} - ${event.end}`}
            onDoubleClick={handleDoubleClick}
        >
            <div className="truncate font-semibold" onClick={(e) => e.stopPropagation()}>
                {isEditing ? (
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        onBlur={handleNameSave}
                        onKeyDown={handleKeyPress}
                        onClick={handleInputClick}
                        onMouseDown={handleInputClick}
                        className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full text-xs font-semibold cursor-text"
                        autoFocus
                    />
                ) : (
                    event.name
                )}
            </div>
            <div className="text-white/80 text-[10px] mt-1" onClick={(e) => e.stopPropagation()}>
                {event.start} - {event.end}
            </div>

            <div
                className="absolute left-0 top-0 bottom-0 w-2 bg-white/20 opacity-0 group-hover:opacity-100 cursor-w-resize transition-opacity hover:bg-white/40"
                onMouseDown={(e) => handleMouseDown(e, 'resize-left')}
            />

            <div
                className="absolute right-0 top-0 bottom-0 w-2 bg-white/20 opacity-0 group-hover:opacity-100 cursor-e-resize transition-opacity hover:bg-white/40"
                onMouseDown={(e) => handleMouseDown(e, 'resize-right')}
            />
        </div>
    );
}