import { defineStore } from "pinia";
import { RecordDataTypes, type RecordData, type RecordsDataState } from "./RecordsTypes";

export const useRecordsStore = defineStore("RecordsStore", {
  state: (): RecordsDataState => ({
    records: [],
  }),

  actions: {
    addRecord(record: RecordData) {
      this.records.push(record);
    },
    updateRecordField<K extends keyof RecordData>(id: string, field: K, value: RecordData[K]) {
      const record = this.records.find((r) => r.id === id);
      if (!record) return;

      record[field] = value;

      if (field === "type" && value === RecordDataTypes.LDAP) {
        record.password = null;
      }
    },
    removeRecord(id: string) {
      this.records = this.records.filter((record) => record.id !== id);
    },
  },
});
