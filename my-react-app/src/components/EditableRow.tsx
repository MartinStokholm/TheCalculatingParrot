import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

interface EditableRowProps<T> {
  row: T;
  columns: ColumnDef<T>[];
  onChange: (field: keyof T, value: string | number) => void;
}

const EditableRow = <T,>({ row, columns, onChange }: EditableRowProps<T>) => {
  const [localRow, setLocalRow] = useState(row);

  useEffect(() => {
    setLocalRow(row);
  }, [row]);

  const handleInputChange = (field: keyof T, value: string | number) => {
    const parsedValue =
      field === "amount" ? parseFloat(value as string) : value;
    setLocalRow((prev) => ({ ...prev, [field]: parsedValue }));
    onChange(field, parsedValue);
  };

  return (
    <tr>
      {columns.map((col) => (
        <td key={col.id as string}>
          <input
            type="text"
            value={localRow[col.id as keyof T] as string | number}
            onChange={(e) =>
              handleInputChange(col.id as keyof T, e.target.value)
            }
            className="text-center whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900 bg-inherit"
          />
        </td>
      ))}
    </tr>
  );
};

export default EditableRow;
