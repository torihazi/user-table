// import "./App.css";
import { useState } from "react";
import { COLUMN_LIST } from "./constants/column";
import { Table } from "./components/table";
import { UserForm } from "./components/userForm";
import { useUsers } from "./hooks/useUsers";
import { getVisibleColumns } from "./utils/columnsHelper";
import { SortDirection, SortKey } from "./type/user";

function App() {
  const {
    role,
    setRole,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    displayUsers,
    setUsers,
  } = useUsers();
  const [isOpen, setIsOpen] = useState(false);
  const visibleColumns = getVisibleColumns(COLUMN_LIST, role);

  return (
    <>
      <div className="flex gap-2">
        <select
          className="border border-gray-300 rounded-md p-2"
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
          className="border border-gray-300 rounded-md p-2"
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
          {role === "mentor" && (
            <option value="experienceDays">経験日数</option>
          )}
        </select>
        <select
          className="border border-gray-300 rounded-md p-2"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value as SortDirection)}
          disabled={role === "all" || sortKey === "none"}
        >
          <option value="asc">昇順</option>
          <option value="desc">降順</option>
        </select>
      </div>
      <button
        className="border border-gray-300 rounded-md p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        新規作成フォーム {isOpen ? "閉じる" : "開く"}
      </button>
      {isOpen && <UserForm setUsers={setUsers} setIsOpen={setIsOpen} />}
      <Table columns={visibleColumns} data={displayUsers} />
    </>
  );
}

export default App;
