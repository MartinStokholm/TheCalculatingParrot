import { ColumnDef } from "@tanstack/react-table";
import { LineItemWithCategory } from "@/redux/api/endpoints/calculatingParrotApi";
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, DeleteIcon } from "lucide-react";
import { EditLineitemPopover } from "./EditLineItemPopover";
import { DeleteLineItemPopover } from "./DeleteLineItemPopover";
import { CheckedState } from "@radix-ui/react-checkbox";

export const BudgetColumns: ColumnDef<LineItemWithCategory, any>[] = [
  {
    id: "select",
    header: () => <div className="text-start text-slate-800">Select</div>,
    cell: ({ row }) => (
      <Checkbox
        disabled={false}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
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
    id: "recurrence",
    header: "Recurrence",
    accessorKey: "recurrence",
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
    id: "actions",
    header: ({ table }) => {
      const isSomeRowsSelected = table.getIsSomeRowsSelected();
      return isSomeRowsSelected ? (
        <p className="text-slate-800 underline">Actions</p>
      ) : (
        <p>Actions</p>
      );
    },
    cell: ({ row }) => {
      const lineitem = row.original;
      const isSelected = row.getIsSelected();
      const onCheckedChange = (value: CheckedState) => {
        row.toggleSelected(!!value);
      };

      return (
        <div className="flex gap-4 justify-between ">
          {(isSelected && (
            <>
              <EditLineitemPopover
                lineitem={lineitem}
                onCheckedChange={onCheckedChange}
              />
              <DeleteLineItemPopover
                lineitemId={lineitem.id}
                onCheckedChange={onCheckedChange}
              />
            </>
          )) || (
            <>
              <Button disabled variant="outline" size={"sm"}>
                Edit
              </Button>{" "}
              <Button disabled variant={"destructive"} size={"sm"}>
                Delete <DeleteIcon className="ml-2" />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
