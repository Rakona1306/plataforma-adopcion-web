export function formatDate(dateString: Date): string {
    const date = String(dateString);
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

export function formatDateForInput(date: Date | string | undefined): string {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}