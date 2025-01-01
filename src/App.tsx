// import "./App.css";
import { COLUMN_LIST } from "./constants/column";
import { NEW_USER_LIST } from "./constants/users";
import { Table } from "./components/table";
import { useState } from "react";
import { getVisibleColumns } from "./utils/columnsHelper";
import { getVisibleUsers } from "./utils/usersHelper";

function App() {
  const [role, setRole] = useState<"student" | "mentor" | "all">("all");
  const visibleColumns = getVisibleColumns(COLUMN_LIST, role);
  const visibleUsers = getVisibleUsers(NEW_USER_LIST, role);
  return (
    <>
      <select
        onChange={(e) =>
          setRole(e.target.value as "student" | "mentor" | "all")
        }
      >
        <option value="all">全て</option>
        <option value="student">学生</option>
        <option value="mentor">メンター</option>
      </select>
      <Table columns={visibleColumns} data={visibleUsers} />
    </>
  );
}

export default App;
