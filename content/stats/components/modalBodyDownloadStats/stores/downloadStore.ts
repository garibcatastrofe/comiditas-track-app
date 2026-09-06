import { create } from "zustand";

type Download = {
  download: {
    downloading: boolean | null;
    answerType: "ok" | "error" | "warning" | "info" | null;
    message: string | null;
  };

  setDownload: (download: {
    downloading: boolean | null;
    answerType: "ok" | "error" | "warning" | "info" | null;
    message: string | null;
  }) => void;
};

export const useDownload = create<Download>((set) => ({
  download: {
    downloading: null,
    answerType: null,
    message: null,
  },

  setDownload: (download) => set({ download }),
}));
