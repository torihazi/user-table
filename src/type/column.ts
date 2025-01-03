import { ReactNode } from "react";
import { User, USER_ROLES } from "./user";

export const VISIBLE_USER_ROLES = [
  ...USER_ROLES,
  "all",
] as const;

export type VisibleRole = typeof VISIBLE_USER_ROLES[number];

export interface Column {
  key: string;
  label: string;
  visibleRole: VisibleRole;
  render: (user: User) => ReactNode;
}