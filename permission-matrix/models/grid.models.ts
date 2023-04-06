export interface HeaderCheckboxProps {
  accountManager: boolean;
  head: boolean;
  lead: boolean;
  user: boolean;
  analyst: boolean;
  admin: boolean;
}
export interface HeaderCheckboxCheckedStatus {
  [columnName: string]: HeaderCheckboxProps;
}
