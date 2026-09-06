import { ClsInsertReport } from "@/src/reports/application/services/ClsInsertReport";
import { ClsSelectReportByDate } from "@/src/reports/application/services/ClsSelectReportByDate";
import { ClsSelectReports } from "@/src/reports/application/services/ClsSelectReports";
import { ClsSelectReportsStats } from "@/src/reports/application/services/ClsSelectReportsStats";
import { ClsUpdateReport } from "@/src/reports/application/services/ClsUpdateReport";
import { ClsReportSQLiteRepository } from "@/src/reports/infrastructure/ClsReportSQLiteRepository";

const ReportRepository = new ClsReportSQLiteRepository();

export const ServiceContainer = {
  reports: {
    insert: new ClsInsertReport(ReportRepository),
    selectReportsStats: new ClsSelectReportsStats(ReportRepository),
    selectReports: new ClsSelectReports(ReportRepository),
    selectByDate: new ClsSelectReportByDate(ReportRepository),
    update: new ClsUpdateReport(ReportRepository),
  },
};
