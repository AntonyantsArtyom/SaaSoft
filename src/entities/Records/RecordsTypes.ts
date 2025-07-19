export enum RecordDataTypes {
  LOCAL = "local",
  LDAP = "ldap",
}

export interface RecordData {
  id: string;
  type: RecordDataTypes;
  login: string;
  password: string | null;
  tags: string[];
}

export interface RecordsDataState {
  records: RecordData[];
}
