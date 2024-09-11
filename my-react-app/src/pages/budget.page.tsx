import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorBanner } from "../components/Error";
import { useGetBudgetsQuery } from "../redux/features/budgetApiSlice";

export default function BudgetPage() {
  const { data: budgets, error, isLoading } = useGetBudgetsQuery();

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  if (error) {
    return <ErrorBanner title="Error!" text="Failed to fetch budget data" />;
  }

  return (
    <>
      <h1>Budget Page</h1>
      <ul>
        {budgets?.map((budget) => (
          <li key={budget.id}>{budget.name}</li>
        ))}
      </ul>
    </>
  );
}
