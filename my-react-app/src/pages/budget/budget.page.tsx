import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorBanner } from "../../components/Error";
import { useGetBudgetsQuery } from "../../redux/api/endpoints/calculatingParrotApi";
import { Title, TitleSizes } from "../../components/Title";
import { useNavigate } from "react-router-dom";

export default function BudgetPage() {
  const { data: budgets, error, isLoading } = useGetBudgetsQuery();
  const navigate = useNavigate();

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
      <Title size={TitleSizes.Large} text="My budgets" />
      <ul>
        {budgets?.map((budget) => (
          <li
            className="shadow-md p-4"
            key={budget.id}
            onClick={() => navigate(budget.id)}
          >
            <p> Name: {budget.name} </p>
            <p> UserId: {budget.userId} </p>
            <p> BudgetId: {budget.id}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
