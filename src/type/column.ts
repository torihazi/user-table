import { ReactNode } from "react";
import { User } from "./user";

export interface Column {
  key: string;
  label: string;
  render: (user: User) => ReactNode;
}
