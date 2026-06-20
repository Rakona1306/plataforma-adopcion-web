export function formatDate(dateString: Date): string {
    const date = String(dateString);
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}