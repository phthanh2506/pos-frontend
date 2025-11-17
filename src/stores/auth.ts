import { defineStore } from "pinia";
import Logger from "../utils/logger";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "" as string | null,
    user: null as User | null,
  }),
  actions: {
    setAuth(token: string, user: User) {
      this.token = token;
      this.user = user;
      try {
        localStorage.setItem("auth.token", token);
        localStorage.setItem("auth.user", JSON.stringify(user));
      } catch (e: any) {
        Logger.error(`Failed to save auth state to storage: + ${e.toString()}`);
      }
    },
    clearAuth() {
      this.token = null;
      this.user = null;
      try {
        localStorage.removeItem("auth.token");
        localStorage.removeItem("auth.user");
      } catch (e: any) {
        Logger.error(`Failed to clear auth state from storage: + ${e.toString()}`);
      }
    },
    restoreFromStorage() {
      try {
        const token = localStorage.getItem("auth.token");
        const user = localStorage.getItem("auth.user");
        if (token) this.token = token;
        if (user) this.user = JSON.parse(user);
      } catch (e: any) {
        Logger.error(`Failed to clear auth state from storage: + ${e.toString()}`);
      }
    },
  },
});

export default useAuthStore;
