export default function compareDates(date1: string | Date, date2: string | Date): boolean {
    const d1 = new Date(new Date(date1).toISOString().substring(0, 10));
    const d2 = new Date(new Date(date2).toISOString().substring(0, 10));
    return d1 < d2;
}