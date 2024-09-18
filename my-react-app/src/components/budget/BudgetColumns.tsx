import { ColumnDef } from "@tanstack/react-table";

import {
  LineItemWithCategory,
  useGetBudgetQuery,
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
} from "@/redux/api/endpoints/calculatingParrotApi";

import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { EditLineitemPopover } from "./EditLineItemPopover";

export const BudgetColumns: ColumnDef<LineItemWithCategory, any>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          console.log(row.getAllCells().map((cell) => cell.getValue()));
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    header: () => <div className="text-start text-slate-800">Name</div>,
    accessorKey: "name",
    cell: (row) => row.renderValue(),
  },
  {
    id: "amount",
    header: ({ column }) => {
      return (
        <div className="text-end text-slate-800">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-DK", {
        style: "currency",
        currency: "DKK",
      }).format(amount);
      if (amount < 0) {
        return (
          <div className="text-right text-red-400 font-medium">{formatted}</div>
        );
      }

      return (
        <div className="text-right font-medium text-green-400">{formatted}</div>
      );
    },
  },
  {
    id: "currency",
    header: () => <div className="text-start text-slate-800">Currency</div>,
    accessorKey: "currency",
    cell: (row) => row.renderValue(),
  },
  {
    id: "category.name",
    header: ({ column }) => {
      return (
        <div className="text-end text-slate-800">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    accessorKey: "category.name",
    cell: ({ getValue }) => {
      const category = getValue<string>();
      return <div className="text-end text-blue-400">{category}</div>;
    },
  },
  {
    id: "recurrence",
    header: "Recurrence",
    accessorKey: "recurrence",
    cell: (row) => row.renderValue(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const lineitem = row.original;
      const { id } = useParams<{ id: string }>();
      const { refetch } = useGetBudgetQuery({ budgetId: id || "NaN" });
      const [deleteLineItem] = useDeleteLineItemMutation();

      return (
        <div className="flex gap-4">
          <EditLineitemPopover lineitem={lineitem} refetch={refetch} />
          <Button
            onClick={async () => {
              try {
                await deleteLineItem({ lineItemId: lineitem.id }).unwrap();
                refetch();
              } catch (error) {
                console.error("Failed to delete line item:", error);
              }
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
