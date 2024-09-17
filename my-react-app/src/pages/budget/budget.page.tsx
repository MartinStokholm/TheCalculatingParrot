import { LoadingSpinner } from "../../components/state/LoadingSpinner";
import { ErrorBanner } from "../../components/state/Error";
import { useGetBudgetsQuery } from "../../redux/api/endpoints/calculatingParrotApi";
import { Title, TitleSizes } from "../../components/common/Title";
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
            className="shadow-md bg-white p-4 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer animate-pulse hover:animate-none"
            key={budget.id}
            onClick={() => {
              console.log(budget.id);
              navigate("/budgets/" + budget.id);
            }}
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
