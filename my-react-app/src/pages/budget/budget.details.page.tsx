import { useState } from "react";
import { useParams } from "react-router-dom";
import { Title, TitleSizes } from "../../components/common/Title";

import { LoadingSpinner } from "../../components/state/LoadingSpinner";
import { ErrorBanner } from "../../components/state/Error";

import { CreateLineItemForm } from "../../components/budget/NewLineItemForm";
import { LineItemActions } from "../../components/budget/LineItemActions";
import { BudgetColumns } from "../../components/budget/BudgetColumns";
import { CategoryChart } from "../../components/budget/CategoryChart";
import { BudgetSummary } from "../../components/budget/BudgetSummary";
import { Table } from "../../components/budget/Table";

import { ToggleShow } from "../../components/toggle/ToggleShow";
import { ToggleMenu } from "../../components/toggle/ToggleMenu";
import { ToggleProvider } from "../../components/toggle/ToggleContext";
import { ToggleLabels } from "../../constants/toggleLabels";
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
  const [currentLineItem, setCurrentLineItem] =
    useState<LineItemWithCategory | null>(null);
  const [deleteLineItem] = useDeleteLineItemMutation();
  const [updateLineItem] = useUpdateLineItemMutation();

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

  const handleCancelButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setCurrentLineItem(null);
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

  const categoryExpensesData =
    budget?.lineItems.reduce((acc, lineItem) => {
      const category = lineItem.category.name;
      const amount = lineItem.amount;

      if (!acc[category]) {
        acc[category] = { category, amount: 0 };
      }

      acc[category].amount += amount;
      return acc;
    }, {} as Record<string, { category: string; amount: number }>) || {};

  const categoryExpensesArray = Object.values(categoryExpensesData);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorBanner title="Error!" text="Failed to fetch budget details" />;
  }

  return (
    <ToggleProvider>
      <Title
        className="place-self-start ml-0 "
        size={TitleSizes.Large}
        text={`Details for Budget: ${budget?.name}`}
      />
      <ToggleMenu
        labels={[
          ToggleLabels.Summary,
          ToggleLabels.Table,
          ToggleLabels.AddLineItem,
        ]}
      />

      <ToggleShow label={ToggleLabels.Summary}>
        <BudgetSummary
          startingCapital={budget?.startingCapital || 0}
          lineItems={budget?.lineItems || []}
        />
        <CategoryChart lineItems={budget?.lineItems || []} />
      </ToggleShow>

      <ToggleShow label={ToggleLabels.Table}>
        <LineItemActions
          currentLineItem={currentLineItem}
          onSave={handleSaveButtonClick}
          onCancel={handleCancelButtonClick}
          onDelete={handleDeleteButtonClick}
        />
        <Table
          data={budget?.lineItems || []}
          columns={BudgetColumns}
          showFooter
          selectedRowId={currentLineItem?.id}
          onRowClick={(row: LineItemWithCategory) => setCurrentLineItem(row)}
          onRowChange={handleRowChange}
        />
        <LineItemActions
          currentLineItem={currentLineItem}
          onSave={handleSaveButtonClick}
          onCancel={handleCancelButtonClick}
          onDelete={handleDeleteButtonClick}
        />
      </ToggleShow>

      <ToggleShow label={ToggleLabels.AddLineItem}>
        <CreateLineItemForm budgetId={id || "NaN"} refetch={refetch} />
      </ToggleShow>
    </ToggleProvider>
  );
}
