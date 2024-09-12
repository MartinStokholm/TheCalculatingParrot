import { useGetBudgetQuery } from "../../redux/api/endpoints/calculatingParrotApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorBanner } from "../../components/Error";
import { Title, TitleSizes } from "../../components/Title";
import { useParams } from "react-router-dom";

export default function BudgetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: budget,
    error,
    isLoading,
  } = useGetBudgetQuery({ budgetId: id || "NaN" });

  console.log(id);
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
    </>
  );
}
