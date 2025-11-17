import { defineStore } from "pinia"

type LoadingMap = Record<string, boolean>

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loadingCount: 0 as number,
    loadingMap: {} as LoadingMap,
  }),
  getters: {
    isLoading: (state) => (key?: string) => {
      if (key) return !!state.loadingMap[key]
      if (state.loadingCount > 0) return true
      return Object.values(state.loadingMap).some(Boolean)
    },
  },
  actions: {
    start(key?: string) {
      if (key) {
        this.loadingMap = { ...this.loadingMap, [key]: true }
      } else {
        this.loadingCount += 1
      }
    },

    stop(key?: string) {
      if (key) {
        if (this.loadingMap[key]) {
          const { [key]: _removed, ...rest } = this.loadingMap
          this.loadingMap = rest
        }
      } else {
        this.loadingCount = Math.max(0, this.loadingCount - 1)
      }
    },

    set(key: string, value: boolean) {
      if (!key) return
      this.loadingMap = { ...this.loadingMap, [key]: value }
    },

    reset() {
      this.loadingCount = 0
      this.loadingMap = {}
    },
  },
})

export default useLoadingStore
