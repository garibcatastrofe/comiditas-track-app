import { getToday } from "@/content/shared/utils/formatDate";
import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";
import { ClsReportController } from "@/src/reports/infrastructure/ClsReportController";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useReport() {
  const [report, setReport] = useState<IReportPrimitive | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(false);

    const response = await ClsReportController.insertReport({
      date: getToday(),
      breakfastStatus: "empty",
      lunchStatus: "empty",
      dinnerStatus: "empty",
    });

    if (response.ok) {
      setReport(response.report);
    } else {
      setError(true);
    }

    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchReport();
    }, [fetchReport]),
  );

  return {
    report,
    error,
    loading,
    retry: fetchReport,
  };
}
