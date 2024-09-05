import { PageWrapper } from "../../components/PageWrapper";
import { useGetBudgetsQuery } from "../api/apiSlice";

export default function BudgetPage() {
  const { data: budgets, error, isLoading } = useGetBudgetsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading budgets</div>;

  return (
    <PageWrapper>
      <h1>Budget Page</h1>
      <ul>
        {budgets?.map((budget) => (
          <li key={budget.id}>{budget.name}</li>
        ))}
      </ul>
    </PageWrapper>
  );
}
