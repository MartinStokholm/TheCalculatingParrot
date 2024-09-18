import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { EditableRow } from "./EditableRow";

interface Identifiable {
  id: string;
}

interface TableProps<T extends Identifiable> {
  data: T[];
  columns: ColumnDef<T>[];
  showFooter?: boolean;
  onRowClick?: (row: T) => void;
  selectedRowId?: string | null;
  onRowChange?: (field: keyof T, value: string | number) => void;
}

export const Table = <T extends Identifiable>({
  data,
  columns,
  showFooter = true,
  selectedRowId,
  onRowClick,
  onRowChange,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-md">
      <div className="inline-block min-w-full p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-center bg-zinc-300 table table-zebra ">
            <thead className="border-b-4 border-b-black bg-gray-50 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-sm font-semibold text-gray-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) =>
                row.original.id === selectedRowId ? (
                  <EditableRow
                    key={row.id}
                    row={row.original as T}
                    columns={columns}
                    onChange={onRowChange!}
                  />
                ) : (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick && onRowClick(row.original as T)} // Extract the original data
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
            {showFooter ? (
              <tfoot className="border-t bg-gray-50">
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            ) : null}
          </table>
        </div>
      </div>
    </div>
  );
};
