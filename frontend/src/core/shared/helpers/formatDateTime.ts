export function formatDateTime(isoDate: Date | string, onlyDate?: boolean): string {
  const date = new Date(isoDate);

  const day = date.toLocaleDateString("es-PE");
  const time = date.toLocaleTimeString("es-PE");

  if (onlyDate) {
    return `${day}`;
  }

  return `${day} ${time}`;
}