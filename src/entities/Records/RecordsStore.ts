import { defineStore } from "pinia";
import { RecordDataTypes, type RecordData, type RecordsDataState } from "./RecordsTypes";

export const useRecordsStore = defineStore("RecordsStore", {
  state: (): RecordsDataState => ({
    records: [
      {
        id: "1",
        type: RecordDataTypes.LOCAL,
        login: "user1",
        password: "password1",
        tags: ["tag1", "tag2"],
      },
      {
        id: "2",
        type: RecordDataTypes.LDAP,
        login: "user2",
        password: "password2",
        tags: ["tag3", "tag4"],
      },
    ],
  }),

  actions: {
    addRecord(record: RecordData) {
      this.records.push(record);
    },

    removeRecord(id: string) {
      this.records = this.records.filter((record) => record.id !== id);
    },
  },
});
