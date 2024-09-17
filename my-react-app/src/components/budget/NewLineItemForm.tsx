import { useForm } from "react-hook-form";
import {
  useCreateLineItemMutation,
  useGetCategoriesQuery,
} from "../../redux/api/endpoints/calculatingParrotApi";
import {
  $36EnumsCurrency,
  $36EnumsRecurrence,
} from "../../redux/api/endpoints/calculatingParrotApi";
import { FormInput } from "../form/FormInput";
import { FormSubmit } from "../form/FormSubmit";

interface CreateLineItemFormProps {
  budgetId: string;
  refetch: () => void; // Add refetch function to props
}

interface FormValues {
  name: string;
  amount: number;
  currency: $36EnumsCurrency;
  recurrence?: $36EnumsRecurrence;
  categoryId: string; // Change to categoryId to capture the selected category ID
}

export const CreateLineItemForm: React.FC<CreateLineItemFormProps> = ({
  budgetId,
  refetch, // Destructure refetch from props
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [createLineItem] = useCreateLineItemMutation();

  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);

      await createLineItem({
        budgetId,
        lineItemCreate: {
          name: data.name,
          amount: Number(data.amount),
          currency: data.currency,
          recurrence: data.recurrence ?? undefined,
          categoryId: data.categoryId,
        },
      }).unwrap();
      reset();
      refetch(); // Call refetch after successful creation
    } catch (error) {
      console.error("Failed to create line item:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 shadow-md bg-white p-4 my-4 rounded-3xl"
    >
      <FormInput
        label="Name"
        name="name"
        type="text"
        register={register}
        validation={{ required: "Name is required" }}
        error={errors.name?.message}
      />
      <FormInput
        label="Amount"
        name="amount"
        type="number"
        register={register}
        validation={{ required: "Amount is required" }}
        error={errors.amount?.message}
      />
      <FormInput
        label="Currency"
        name="currency"
        type="select"
        options={[
          { id: "DKK", name: "DKK" },
          { id: "EUR", name: "EUR" },
          { id: "USD", name: "USD" },
        ]}
        register={register}
        validation={{ required: "Currency is required" }}
        error={errors.currency?.message}
      />
      <FormInput
        label="Recurrence"
        name="recurrence"
        type="select"
        options={[
          { id: "ONCE", name: "ONCE" },
          { id: "DAILY", name: "DAILY" },
          { id: "WEEKLY", name: "WEEKLY" },
          { id: "MONTHLY", name: "MONTHLY" },
          { id: "YEARLY", name: "YEARLY" },
        ]}
        register={register}
        error={errors.recurrence?.message}
      />
      <FormInput
        label="Category"
        name="categoryId"
        type="select"
        options={categories}
        register={register}
        validation={{ required: "Category is required" }}
        error={errors.categoryId?.message}
      />
      <FormSubmit
        isLoading={false}
        submitText="Add line item"
        submittingText="Adding line item..."
      />
    </form>
  );
};
