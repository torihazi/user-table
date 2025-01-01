// import "./App.css";
import { COLUMN_LIST } from "./constants/column";
import { NEW_USER_LIST } from "./constants/users";
import { Table } from "./components/table";
import { useState } from "react";
import { getVisibleColumns } from "./utils/columnsHelper";
import { getSortedUsers, getVisibleUsers } from "./utils/usersHelper";
import { SortDirection, SortKey } from "./type/user";

function App() {
  const [role, setRole] = useState<"student" | "mentor" | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("none");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const visibleColumns = getVisibleColumns(COLUMN_LIST, role);
  const visibleUsers = getVisibleUsers(NEW_USER_LIST, role);
  const sortedUsers = getSortedUsers(visibleUsers, sortKey, sortDirection);
  return (
    <>
      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value as "student" | "mentor" | "all")
        }
      >
        <option value="all">全て</option>
        <option value="student">学生</option>
        <option value="mentor">メンター</option>
      </select>
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as SortKey)}
      >
        <option value="none">なし</option>
        {role === "student" && (
          <>
            <option value="studyMinutes">学習時間</option>
            <option value="score">スコア</option>
          </>
        )}
        {role === "mentor" && <option value="experienceDays">経験日数</option>}
      </select>
      <select
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value as SortDirection)}
      >
        <option value="asc">昇順</option>
        <option value="desc">降順</option>
      </select>
      <Table columns={visibleColumns} data={sortedUsers} />
    </>
  );
}

export default App;
