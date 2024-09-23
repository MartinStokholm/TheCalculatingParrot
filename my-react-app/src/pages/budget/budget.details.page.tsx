import { useState } from "react";
import { useParams } from "react-router-dom";
import { WidgetBox } from "@/components/common/WidgetBox";
import { Title, TitleSizes } from "@/components/common/Title";

import { ErrorBanner } from "@/components/state/Error";
import { LoadingSpinner } from "@/components/state/LoadingSpinner";

import { BudgetColumns } from "@/components/budget/BudgetColumns";
import { CategoryChart } from "@/components/budget/CategoryChart";
import { BudgetSummary } from "@/components/budget/BudgetSummary";

import { ToggleShow } from "@/components/toggle/ToggleShow";
import { ToggleMenu } from "@/components/toggle/ToggleMenu";
import { ToggleProvider } from "@/components/toggle/ToggleContext";
import { ToggleLabels } from "@/constants/toggleLabels";

import { useGetBudgetQuery } from "@/redux/api/endpoints/calculatingParrotApi";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@/components/budget/DataTable";
import { CreateLineItemPopover } from "@/components/budget/CreateLineItemPopover";

export default function BudgetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: budget,
    error,
    isLoading,
    refetch,
  } = useGetBudgetQuery({ budgetId: id || "NaN" });

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

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorBanner title="Error!" text="Failed to fetch budget details" />;
  }

  return (
    <ToggleProvider>
      <Title size={TitleSizes.Large} text={`${budget?.name}`} />

      <ToggleMenu
        labels={[
          ToggleLabels.CategoryOverview,
          ToggleLabels.Summary,
          ToggleLabels.Table,
        ]}
      />
      <ToggleShow label={ToggleLabels.CategoryOverview}>
        <WidgetBox>
          <Title
            className="place-self-start"
            size={TitleSizes.Small}
            text="Category Overview"
            color="white"
          />
          <CategoryChart lineItems={budget?.lineItems || []} />
        </WidgetBox>
      </ToggleShow>
      <ToggleShow label={ToggleLabels.Summary}>
        <WidgetBox>
          <Title
            className="place-self-start"
            size={TitleSizes.Small}
            text="Budget Summary"
            color="white"
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
            className="place-self-start"
            size={TitleSizes.Small}
            text="Manage Budget"
            color="white"
          />

          <DataTable table={table} />
          <CreateLineItemPopover budgetId={id || "NaN"} refetch={refetch} />
        </WidgetBox>
      </ToggleShow>
    </ToggleProvider>
  );
}
