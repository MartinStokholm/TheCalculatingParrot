import { ColumnDef } from "@tanstack/react-table";
import { LineItemWithCategory } from "../../redux/api/endpoints/calculatingParrotApi";

export const budgetColumns: ColumnDef<LineItemWithCategory>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    cell: (row) => row.renderValue(),
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
    cell: ({ getValue }) => {
      const amount = getValue<number>();
      const amountClass = amount < 0 ? "text-red-500" : "text-green-500";
      return <span className={amountClass}>{amount}</span>;
    },
  },
  {
    id: "currency",
    header: "Currency",
    accessorKey: "currency",
    cell: (row) => row.renderValue(),
  },
  {
    id: "category.name",
    header: "Category",
    accessorKey: "category.name",
    cell: (row) => row.renderValue(),
  },
  {
    id: "recurrence",
    header: "Recurrence",
    accessorKey: "recurrence",
    cell: (row) => row.renderValue(),
  },
];
