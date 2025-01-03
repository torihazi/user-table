import { Column } from "../type/column";

export const getVisibleColumns = (columns: Column[], role: "student" | "mentor" | "all") => {
  return columns.filter((column) => {
    if (role === "all") return true;
    if (role === "student") return column.visibleRole === "student" || column.visibleRole === "all";
    if (role === "mentor") return column.visibleRole === "mentor" || column.visibleRole === "all";
    return false;
  });
};
