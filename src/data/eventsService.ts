import timelineItems from "../../timelineItems";

export class EventsService {
    static loadEvents() {
        const storedItems = localStorage.getItem("timeline-items");

        if (!storedItems) {
            this.saveEvents(timelineItems);
        }

        return storedItems ? JSON.parse(storedItems) : timelineItems;
    }

    static saveEvents(events) {
        localStorage.setItem("timeline-items", JSON.stringify(events));
    }
}
