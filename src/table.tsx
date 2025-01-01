export const Table = ({ columns, data }: { columns: any[]; data: any[] }) => {
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
              <td>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
