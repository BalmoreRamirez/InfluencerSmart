import { defineStore } from "pinia";

export type ThemeMode = "light" | "dark";

export const useAppStore = defineStore("app", {
  state: () => ({
    theme: "light" as ThemeMode,
    locale: "es-ES"
  }),
  actions: {
    setTheme(theme: ThemeMode) {
      this.theme = theme;
    },
    setLocale(locale: string) {
      this.locale = locale;
    }
  }
});

