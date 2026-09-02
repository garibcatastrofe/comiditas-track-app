import { getToday } from "@/content/shared/utils/formatDate";
import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";
import { ClsReportController } from "@/src/reports/infrastructure/ClsReportController";
import { useEffect, useState } from "react";

export function useReport() {
  const [report, setReport] = useState<IReportPrimitive | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);

      const response = await ClsReportController.insertReport({
        date: getToday(),
        breakfastStatus: "empty",
        lunchStatus: "empty",
        dinnerStatus: "empty",
      });

      if (response.ok) {
        setReport(response.report);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    };

    fetchReport();
  }, [loading]);

  return {
    report,
    error,
    loading,
    setLoading,
  };
}
