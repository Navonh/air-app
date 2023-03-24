export function formatTime(timestamp) {
    if (!timestamp) {
        return '';
    }
    const date = new Date(timestamp.replace('T', ' '));
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = hours + ':' + minutes + ' ' + ampm;
    return timeString;
}