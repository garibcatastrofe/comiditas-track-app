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

export function getToday(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

export function getMonthYear(date: Date = new Date()): {
  month: number;
  year: number;
} {
  return { month: date.getMonth() + 1, year: date.getFullYear() };
}
