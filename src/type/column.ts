import { ReactNode } from "react";
import { User } from "./user";

export interface Column {
  key: string;
  label: string;
  visibleRole: "student" | "mentor" | "all";
  render: (user: User) => ReactNode;
}
