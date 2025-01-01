import "./App.css";
import { Table } from "./table";

function App() {
  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
}

export default App;
