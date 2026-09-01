/* API */
import { IReportStats } from "@/api/reports/domain/interfaces/IReportStats";

/* HOOKS */
import { useEffect, useState } from "react";

export function useStats() {
  const [stats, setStats] = useState<IReportStats | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStats({
        objExcelentReport: { count: 32, focused: true },
        objRegularReport: { count: 30, focused: false },
        objTerribleReport: { count: 7, focused: false },
        objEmptyReport: { count: 3, focused: false },
        recordedDays: "18 de 31",
        notRecordedDays: "13",
        month: "Agosto",
        year: "2026",
        reports: [
          {
            id: 1,
            breakfastStatus: "excelent",
            lunchStatus: "regular",
            dinnerStatus: "terrible",
            date: "2026-08-27",
          },
          {
            id: 2,
            breakfastStatus: "regular",
            lunchStatus: "regular",
            dinnerStatus: "regular",
            date: "2026-08-26",
          },
          {
            id: 3,
            breakfastStatus: "empty",
            lunchStatus: "empty",
            dinnerStatus: "empty",
            date: "2026-08-25",
          },
        ],
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return { stats, setStats };
}
