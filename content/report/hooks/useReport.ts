/* API */
import { IReportPrimitive } from "@/api/reports/domain/interfaces/IReportPrimitive";

/* HOOKS */
import { useEffect, useState } from "react";

export function useReport(id: string) {
  const [report, setReport] = useState<IReportPrimitive | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReport({
        id: Number(id),
        breakfast_status: "excelente",
        lunch_status: "regular",
        dinner_status: "terrible",
        date: "2026-08-27",
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return { report };
}
