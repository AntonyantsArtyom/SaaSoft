import { defineStore } from "pinia";

export const useAppStateStore = defineStore("AppStateStore", {
  state: () => ({
    isAddingNewRecord: false,
  }),

  actions: {
    setIsAddingNewRecord(isAddingNewRecord: boolean) {
      this.isAddingNewRecord = isAddingNewRecord;
    },
  },
});
