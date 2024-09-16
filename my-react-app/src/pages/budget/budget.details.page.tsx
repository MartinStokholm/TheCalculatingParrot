import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../components/Table";
import CreateLineItemForm from "../../components/NewLineItemForm";
import {
  LineitemNoId,
  LineItemWithCategory,
  useGetBudgetQuery,
  useUpdateLineItemMutation,
} from "../../redux/api/endpoints/calculatingParrotApi";
import { Title, TitleSizes } from "../../components/Title";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorBanner } from "../../components/Error";

export default function BudgetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: budget,
    error,
    isLoading,
    refetch,
  } = useGetBudgetQuery({ budgetId: id || "NaN" });

  const [showAddLineItem, setShowAddLineItem] = useState(false);

  const [updateLineItem] = useUpdateLineItemMutation();
  const [currentLineItem, setCurrentLineItem] =
    useState<LineItemWithCategory | null>(null);

  const toggleShowAddLineItem = () => {
    setShowAddLineItem((prevState) => !prevState);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (currentLineItem) {
      handleSaveChanges(currentLineItem);
    }
  };

  const handleSaveChanges = async (lineItem: LineItemWithCategory) => {
    try {
      await updateLineItem({
        lineItemId: lineItem.id,
        lineitemNoId: lineItem as LineitemNoId,
      }).unwrap();
      console.log("Line item updated successfully with id:", lineItem.id);
      // Reset the current line item
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

      <div className="flex flex-col gap-4">
        {currentLineItem && (
          <button
            className="rounded-md px-4 py-2 bg-blue-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-blue-500 hover:text-zinc-300"
            onClick={handleButtonClick}
          >
            Save Changes
          </button>
        )}

        <button
          className="rounded-md px-4 py-2 bg-blue-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-blue-500 hover:text-zinc-300"
          onClick={toggleShowAddLineItem}
        >
          {showAddLineItem ? "Hide Form" : "Add Line Item"}
        </button>
        {showAddLineItem && <CreateLineItemForm budgetId={id || "NaN"} />}
      </div>
    </>
  );
}
