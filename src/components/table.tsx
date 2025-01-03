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
    <table className="border border-gray-300 rounded-md w-full">
      <thead>
        <tr className="border-b border-gray-300">
          {columns.map((column) => (
            <th key={column.key} className="border-r border-gray-300">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-b border-gray-300">
            {columns.map((column) => (
              <td key={column.key} className="border-r border-gray-300">
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
