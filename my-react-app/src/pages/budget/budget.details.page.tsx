import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WidgetBox } from "@/components/common/WidgetBox";
import { Title, TitleSizes } from "@/components/common/Title";

import { ErrorBanner } from "@/components/state/Error";
import { LoadingSpinner } from "@/components/state/LoadingSpinner";

import { BudgetColumns } from "@/components/budget/BudgetColumns";
import { CategoryChart } from "@/components/budget/CategoryChart";
import { BudgetSummary } from "@/components/budget/BudgetSummary";
import { CreateLineItemForm } from "@/components/budget/NewLineItemForm";
import { LineItemActions } from "@/components/budget/LineItemActions";

import { ToggleShow } from "@/components/toggle/ToggleShow";
import { ToggleMenu } from "@/components/toggle/ToggleMenu";
import { ToggleProvider } from "@/components/toggle/ToggleContext";
import { ToggleLabels } from "@/constants/toggleLabels";

import {
  LineItemWithCategory,
  useGetBudgetQuery,
  useUpdateLineItemMutation,
  useDeleteLineItemMutation,
} from "@/redux/api/endpoints/calculatingParrotApi";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@/components/budget/DataTable";

export default function BudgetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: budget,
    error,
    isLoading,
    refetch,
  } = useGetBudgetQuery({ budgetId: id || "NaN" });

  const [currentLineItem, setCurrentLineItem] =
    useState<LineItemWithCategory | null>(null);
  const [deleteLineItem] = useDeleteLineItemMutation();
  const [updateLineItem] = useUpdateLineItemMutation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: budget?.lineItems || [],
    columns: BudgetColumns,
    enableMultiRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  const handleDeleteButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (currentLineItem) {
      try {
        await deleteLineItem({ lineItemId: currentLineItem.id }).unwrap();
        setCurrentLineItem(null);
        refetch();
      } catch (error) {
        console.error("Failed to delete line item:", error);
      }
    }
  };

  const handleSaveButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (currentLineItem) {
      try {
        await updateLineItem({
          lineItemId: currentLineItem.id,
          lineItemCreate: {
            name: currentLineItem.name,
            amount: currentLineItem.amount,
            currency: currentLineItem.currency,
            categoryId: currentLineItem.categoryId,
            recurrence: currentLineItem.recurrence || undefined,
          },
        }).unwrap();
        setCurrentLineItem(null);
        refetch();
      } catch (error) {
        console.error("Failed to update line item:", error);
      }
    }
  };

  const handleCancelButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setCurrentLineItem(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorBanner title="Error!" text="Failed to fetch budget details" />;
  }

  return (
    <ToggleProvider>
      <Title
        className="place-self-start ml-0 w-full"
        size={TitleSizes.Large}
        text={`${budget?.name}`}
      />
      <Title
        className="place-self-start ml-0 border-b-0"
        size={TitleSizes.Medium}
        text={`Starting capital: ${budget?.startingCapital}`}
      />
      <ToggleMenu
        labels={[
          ToggleLabels.CategoryOverview,
          ToggleLabels.Summary,
          ToggleLabels.Table,
          ToggleLabels.AddLineItem,
        ]}
      />
      <ToggleShow label={ToggleLabels.CategoryOverview}>
        <WidgetBox>
          <Title
            className="place-self-start ml-0 w-[33%]"
            size={TitleSizes.Small}
            text="Category Overview"
            color="zinc-100"
          />
          <CategoryChart lineItems={budget?.lineItems || []} />
        </WidgetBox>
      </ToggleShow>
      <ToggleShow label={ToggleLabels.Summary}>
        <WidgetBox>
          <Title
            className="place-self-start ml-0 w-[33%]"
            size={TitleSizes.Small}
            text="Budget Summary"
            color="zinc-100"
          />
          <BudgetSummary
            startingCapital={budget?.startingCapital || 0}
            lineItems={budget?.lineItems || []}
          />
        </WidgetBox>
      </ToggleShow>
      <ToggleShow label={ToggleLabels.Table}>
        <WidgetBox>
          <Title
            className="place-self-start ml-0 w-[33%]"
            size={TitleSizes.Small}
            text="Manage Budget"
            color="zinc-100"
          />
          <LineItemActions
            currentLineItem={currentLineItem}
            onSave={handleSaveButtonClick}
            onCancel={handleCancelButtonClick}
            onDelete={handleDeleteButtonClick}
          />

          <DataTable table={table} />
        </WidgetBox>
      </ToggleShow>
      <ToggleShow label={ToggleLabels.AddLineItem}>
        <WidgetBox>
          <Title
            className="place-self-start ml-0 w-[33%]"
            size={TitleSizes.Small}
            text="Add to budget"
            color="zinc-100"
          />
          <CreateLineItemForm budgetId={id || "NaN"} refetch={refetch} />
        </WidgetBox>
      </ToggleShow>
    </ToggleProvider>
  );
}
