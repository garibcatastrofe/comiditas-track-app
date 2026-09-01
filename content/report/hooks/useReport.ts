/* API */
import { IReportPrimitive } from "@/api/reports/domain/interfaces/IReportPrimitive";

/* HOOKS */
import { useEffect, useState } from "react";

export function useReport(id: string) {
  const [report, setReport] = useState<IReportPrimitive | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const changeMealStatus = (status: string, meal: string) => {
    if (!report) return;

    if (meal === "desayuno") {
      if (status === "excelent")
        return setReport({ ...report, breakfastStatus: "excelent" });
      if (status === "regular")
        return setReport({ ...report, breakfastStatus: "regular" });
      if (status === "terrible")
        return setReport({ ...report, breakfastStatus: "terrible" });

      return setReport({ ...report, breakfastStatus: "empty" });
    }

    if (meal === "comida") {
      if (status === "excelent")
        return setReport({ ...report, lunchStatus: "excelent" });
      if (status === "regular")
        return setReport({ ...report, lunchStatus: "regular" });
      if (status === "terrible")
        return setReport({ ...report, lunchStatus: "terrible" });

      return setReport({ ...report, lunchStatus: "empty" });
    }

    if (meal === "cena") {
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
    const timeout = setTimeout(() => {
      setReport({
        id: Number(id),
        breakfastStatus: "excelent",
        lunchStatus: "regular",
        dinnerStatus: "terrible",
        date: "2026-08-27",
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

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
