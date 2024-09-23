import { LoadingSpinner } from "../../components/state/LoadingSpinner";
import { ErrorBanner } from "../../components/state/Error";
import { useGetBudgetsQuery } from "../../redux/api/endpoints/calculatingParrotApi";
import { Title, TitleSizes } from "../../components/common/Title";
import { useNavigate } from "react-router-dom";
import { BudgetCarousel } from "@/components/budget/BudgetCarousel";

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
        <button onClick={() => navigate("/budget/new")}>
          Create new budget
        </button>
        <BudgetCarousel budgets={budgets || []} />
      </ul>
    </>
  );
}
