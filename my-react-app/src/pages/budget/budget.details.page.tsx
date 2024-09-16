import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { CreateLineItemForm } from "../../components/NewLineItemForm";
import { Title, TitleSizes } from "../../components/Title";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorBanner } from "../../components/Error";
import { Table } from "../../components/Table";

import {
  LineItemWithCategory,
  useGetBudgetQuery,
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
} from "../../redux/api/endpoints/calculatingParrotApi";

export default function BudgetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: budget,
    error,
    isLoading,
    refetch,
  } = useGetBudgetQuery({ budgetId: id || "NaN" });

  const [deleteLineItem] = useDeleteLineItemMutation();

  const [showAddLineItem, setShowAddLineItem] = useState(false);

  const [updateLineItem] = useUpdateLineItemMutation();
  const [currentLineItem, setCurrentLineItem] =
    useState<LineItemWithCategory | null>(null);

  const toggleShowAddLineItem = () => {
    setShowAddLineItem((prevState) => !prevState);
  };

  const handleDeleteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (currentLineItem) {
      handleDeleteLineItem(currentLineItem);
    }
  };

  const handleDeleteLineItem = async (lineItem: LineItemWithCategory) => {
    try {
      await deleteLineItem({ lineItemId: lineItem.id }).unwrap();
      setCurrentLineItem(null);
      refetch();
    } catch (error) {
      console.error("Failed to delete line item:", error);
    }
  };

  const handleSaveButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (currentLineItem) {
      handleSaveChanges(currentLineItem);
    }
  };

  const handleSaveChanges = async (lineItem: LineItemWithCategory) => {
    try {
      await updateLineItem({
        lineItemId: lineItem.id,
        lineItemCreate: {
          name: lineItem.name,
          amount: lineItem.amount,
          currency: lineItem.currency,
          categoryId: lineItem.categoryId,
          recurrence: lineItem.recurrence || undefined,
        },
      }).unwrap();
      setCurrentLineItem(null);
      refetch();
    } catch (error) {
      console.error("Failed to update line item:", error);
    }
  };

  const handleRowChange = (
    field: keyof LineItemWithCategory,
    value: string | number
  ) => {
    if (currentLineItem) {
      setCurrentLineItem({ ...currentLineItem, [field]: value });
    }
  };

  const cols = useMemo<ColumnDef<LineItemWithCategory>[]>(
    () => [
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
      },
      {
        id: "recurrence",
        header: "Recurrence",
        accessorKey: "recurrence",
        cell: (row) => row.renderValue(),
      },
    ],
    [refetch]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorBanner title="Error!" text="Failed to fetch budget details" />;
  }

  return (
    <>
      <Title
        size={TitleSizes.Large}
        text={`Details for Budget: ${budget?.name}`}
      />

      <Table
        data={budget?.lineItems || []}
        columns={cols}
        showFooter
        selectedRowId={currentLineItem?.id}
        onRowClick={(row: LineItemWithCategory) => setCurrentLineItem(row)}
        onRowChange={handleRowChange} // Pass the onRowChange prop
      />

      <div className="flex flex-col gap-4 w-[50%]">
        {currentLineItem && (
          <div className="flex flex-row justify-between">
            <button
              className="rounded-md px-4 py-2 bg-blue-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-blue-500 hover:text-zinc-300"
              onClick={handleSaveButtonClick}
            >
              Save Changes
            </button>

            <button
              className="rounded-md px-4 py-2 bg-red-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-red-500 hover:text-zinc-300"
              onClick={handleDeleteButtonClick}
            >
              Delete Line Item
            </button>
          </div>
        )}

        <button
          className="rounded-md px-4 py-2 bg-blue-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-blue-500 hover:text-zinc-300 "
          onClick={toggleShowAddLineItem}
        >
          {showAddLineItem ? "Hide Form" : "Add Line Item"}
        </button>
        {showAddLineItem && (
          <CreateLineItemForm budgetId={id || "NaN"} refetch={refetch} />
        )}
      </div>
    </>
  );
}
