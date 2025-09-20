export function getEventWidth(event, pixelsPerDay) {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const duration = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1);
    return duration * pixelsPerDay;
}