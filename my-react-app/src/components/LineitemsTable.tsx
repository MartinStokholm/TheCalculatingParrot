import React from "react";
import { useTable, Column } from "react-table";
import { LineItem } from "../redux/api/endpoints/calculatingParrotApi";

interface LineItemsTableProps {
  lineItems: LineItem[] | undefined;
}

const LineItemsTable: React.FC<LineItemsTableProps> = ({ lineItems }) => {
  const data = React.useMemo(() => lineItems ?? [], [lineItems]);

  const columns = React.useMemo<Column<LineItem>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }: { value: number }) => `${value.toFixed(2)}`,
      },
      {
        Header: "Currency",
        accessor: "currency",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full table-auto bg-white shadow-md rounded-lg border-collapse"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-left font-semibold text-gray-700"
                  key={column.id}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            21;
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.original.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="border-t px-4 py-2 text-gray-700"
                    key={`${row.original.id}-${cell.column.id}`}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LineItemsTable;
