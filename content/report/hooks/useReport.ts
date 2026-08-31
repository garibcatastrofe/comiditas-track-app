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
      if (status === "excelente")
        return setReport({ ...report, breakfast_status: "excelente" });
      if (status === "regular")
        return setReport({ ...report, breakfast_status: "regular" });
      if (status === "terrible")
        return setReport({ ...report, breakfast_status: "terrible" });

      return setReport({ ...report, breakfast_status: "vacio" });
    }

    if (meal === "comida") {
      if (status === "excelente")
        return setReport({ ...report, lunch_status: "excelente" });
      if (status === "regular")
        return setReport({ ...report, lunch_status: "regular" });
      if (status === "terrible")
        return setReport({ ...report, lunch_status: "terrible" });

      return setReport({ ...report, lunch_status: "vacio" });
    }

    if (meal === "cena") {
      if (status === "excelente")
        return setReport({ ...report, dinner_status: "excelente" });
      if (status === "regular")
        return setReport({ ...report, dinner_status: "regular" });
      if (status === "terrible")
        return setReport({ ...report, dinner_status: "terrible" });

      return setReport({ ...report, dinner_status: "vacio" });
    }
  };

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
