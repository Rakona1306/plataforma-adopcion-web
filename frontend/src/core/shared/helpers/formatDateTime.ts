export function formatDateTime(isoDate: Date | string): string {
  const date = new Date(isoDate);

  const day = date.toLocaleDateString("es-PE");
  const time = date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} ${time}`;
}