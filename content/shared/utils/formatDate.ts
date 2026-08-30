const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  return `${day} de ${months[month - 1]} del ${year}`;
}
