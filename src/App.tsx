import "./App.css";
import { COLUMN_LIST } from "./constants/column";
import { NEW_USER_LIST } from "./constants/users";
import { Table } from "./components/table";

function App() {
  return (
    <>
      <Table columns={COLUMN_LIST} data={NEW_USER_LIST} />
    </>
  );
}

export default App;
