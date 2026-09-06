export class ClsDate {
  public getMonthDateRange({ month, year }: { month: number; year: number }) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    return {
      firstDay: formatDate(firstDay),
      lastDay: formatDate(lastDay),
    };
  }

  public getMonthLastDay(month: number, year: number): number {
    const lastDay = new Date(year, month, 0);

    return lastDay.getDate();
  }

  public getMonthString(month: number) {
    if (month < 10) {
      return "0" + month.toString();
    }

    return month.toString();
  }

  public getDayString(day: number) {
    if (day < 10) {
      return "0" + day.toString();
    }

    return day.toString();
  }
}
