/* API */
import { IReportPrimitive } from "@/src/reports/domain/interfaces/IReportPrimitive";
import { ClsReportController } from "@/src/reports/infrastructure/ClsReportController";

/* HOOKS */
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

/* STORES */
import { useAnnouncement } from "@/content/shared/components/announcement/stores/announcementStore";

export function useReport(date: string) {
  const { setAnnouncement } = useAnnouncement();

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

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError(false);

    const response = await ClsReportController.selectReportByDate({ date });

    if (response.ok) {
      if (response.report) {
        setReport(response.report);
      } else {
        setReport({
          date,
          breakfastStatus: "empty",
          lunchStatus: "empty",
          dinnerStatus: "empty",
        });
      }
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

  const updateReport = async () => {
    setUpdating(true);

    if (report) {
      const response = await ClsReportController.updateReport({
        date,
        report,
      });

      if (response.ok) {
        setAnnouncement({
          isActivated: true,
          announceType: "ok",
          message: response.message,
        });
      } else {
        setAnnouncement({
          isActivated: true,
          announceType: "error",
          message: response.message,
        });
      }
    }

    setUpdating(false);
  };

  return {
    report,
    changeMealStatus,
    updating,
    updateReport,
    retry: fetchReport,
    loading,
    error,
  };
}
