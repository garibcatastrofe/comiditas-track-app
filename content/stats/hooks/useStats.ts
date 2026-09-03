/* API */
import { IReportStats } from "@/src/reports/domain/interfaces/IReportStats";
import { ClsReportController } from "@/src/reports/infrastructure/ClsReportController";

/* HOOKS */
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

/* UTILS */
import { getMonthYear } from "@/content/shared/utils/formatDate";

export function useStats() {
  const [stats, setStats] = useState<IReportStats | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | null>(new Date());

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(false);

    const { month, year } = getMonthYear(date ?? new Date());

    const response = await ClsReportController.selectReportStats({
      month,
      year,
    });

    if (response.ok) {
      setStats(response.stats);
    } else {
      setError(true);
    }

    setLoading(false);
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [fetchStats]),
  );

  return { stats, loading, error, setDate, retry: fetchStats, date };
}
