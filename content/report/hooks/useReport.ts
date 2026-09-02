/* API */
import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";
import { ClsReportController } from "@/src/reports/infrastructure/ClsReportController";

/* HOOKS */
import { useEffect, useState } from "react";

export function useReport(date: string) {
  const [report, setReport] = useState<IReportPrimitive | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const changeMealStatus = (status: string, meal: string) => {
    if (!report) return;

    if (meal === "breakfast") {
      if (status === "excelent")
        return setReport({ ...report, breakfastStatus: "excelent" });
      if (status === "regular")
        return setReport({ ...report, breakfastStatus: "regular" });
      if (status === "terrible")
        return setReport({ ...report, breakfastStatus: "terrible" });

      return setReport({ ...report, breakfastStatus: "empty" });
    }

    if (meal === "lunch") {
      if (status === "excelent")
        return setReport({ ...report, lunchStatus: "excelent" });
      if (status === "regular")
        return setReport({ ...report, lunchStatus: "regular" });
      if (status === "terrible")
        return setReport({ ...report, lunchStatus: "terrible" });

      return setReport({ ...report, lunchStatus: "empty" });
    }

    if (meal === "dinner") {
      if (status === "excelent")
        return setReport({ ...report, dinnerStatus: "excelent" });
      if (status === "regular")
        return setReport({ ...report, dinnerStatus: "regular" });
      if (status === "terrible")
        return setReport({ ...report, dinnerStatus: "terrible" });

      return setReport({ ...report, dinnerStatus: "empty" });
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      const response = await ClsReportController.selectReportByDate({ date });

      if (response.ok) {
        setReport(response.report);
        setLoading(false);
      }
    };
  }, [loading]);

  const updateReport = async () => {
    try {
      setUpdating(true);
      setTimeout(() => {
        console.log("Reporte guardado/actualizado correctamente");
        console.log(report);
        setUpdating(false);
      }, 3000);
    } catch {
      setUpdating(false);
    }
  };

  return { report, changeMealStatus, updating, updateReport };
}
