import { Column } from "../type/column";
import { User } from "../type/user";

export const Table = ({
  columns,
  data,
}: {
  columns: Column[];
  data: User[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
