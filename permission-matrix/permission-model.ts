export interface PermissionRow {
  workspaceId?: any;
  action: string;
  actionCategory: string;
  admin: boolean;
  accountManager: boolean;
  head: boolean;
  lead: boolean;
  user: boolean;
  analyst: boolean;
}
