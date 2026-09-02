import { db } from "@/src/db/drizzleSQLiteService";
import { reports } from "@/src/db/schemas/reports";
import { and, eq, gte, lte } from "drizzle-orm";
import { IReportPrimitive } from "../domain/interfaces/IReportPrimitive";
import { IReportRepository } from "../domain/interfaces/IReportRepository";

export class ClsReportSQLiteRepository implements IReportRepository {
  public async insert(
    report: Omit<IReportPrimitive, "id">,
  ): Promise<IReportPrimitive> {
    const reportCreated = await db
      .insert(reports)
      .values({
        date: report.date,
        breakfast: report.breakfastStatus,
        lunch: report.lunchStatus,
        dinner: report.dinnerStatus,
      })
      .returning({
        id: reports.id,
        date: reports.date,
        breakfastStatus: reports.breakfast,
        lunchStatus: reports.lunch,
        dinnerStatus: reports.dinner,
      });

    return reportCreated[0];
  }

  public async select({
    fromDate,
    toDate,
  }: {
    fromDate: string;
    toDate: string;
  }): Promise<IReportPrimitive[]> {
    const rows = await db
      .select({
        id: reports.id,
        date: reports.date,
        breakfastStatus: reports.breakfast,
        lunchStatus: reports.lunch,
        dinnerStatus: reports.dinner,
      })
      .from(reports)
      .where(and(gte(reports.date, fromDate), lte(reports.date, toDate)))
      .orderBy(reports.date);

    return rows;
  }

  public async selectByDate(date: string): Promise<IReportPrimitive | null> {
    const rows = await db
      .select({
        id: reports.id,
        date: reports.date,
        breakfastStatus: reports.breakfast,
        lunchStatus: reports.lunch,
        dinnerStatus: reports.dinner,
      })
      .from(reports)
      .where(eq(reports.date, date));

    if (rows.length === 0) return null;

    return rows[0];
  }

  public async update(
    date: string,
    report: Partial<IReportPrimitive>,
  ): Promise<void> {
    const updateData: Partial<typeof reports.$inferInsert> = {};

    if (report.breakfastStatus !== undefined) {
      updateData.breakfast = report.breakfastStatus;
    }

    if (report.lunchStatus !== undefined) {
      updateData.lunch = report.lunchStatus;
    }

    if (report.dinnerStatus !== undefined) {
      updateData.dinner = report.dinnerStatus;
    }

    if (Object.keys(updateData).length === 0) {
      return;
    }

    await db.update(reports).set(updateData).where(eq(reports.date, date));
  }
}
