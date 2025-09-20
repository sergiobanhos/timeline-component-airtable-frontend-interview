import { useState } from "react";
import { EventsService } from "../data/eventsService";

export function useEvents() {

    const [events, setEvents] = useState(EventsService.loadEvents());

    const handleEventsChange = (updatedItems) => {
        setEvents(updatedItems);
        localStorage.setItem("timeline-items", JSON.stringify(updatedItems));
    };

    return {
        events,
        handleEventsChange
    };
}