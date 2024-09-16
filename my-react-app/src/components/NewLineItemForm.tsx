import React from "react";
import { useForm } from "react-hook-form";
import { useCreateLineItemMutation } from "../../src/redux/api/endpoints/calculatingParrotApi";
import {
  $36EnumsCurrency,
  $36EnumsRecurrence,
} from "../../src/redux/api/endpoints/calculatingParrotApi";
import { FormInput } from "./FormInput";
import { FormSubmit } from "./FormSubmit";

interface CreateLineItemFormProps {
  budgetId: string;
}

interface FormValues {
  name: string;
  amount: number;
  currency: $36EnumsCurrency;
  recurrence?: $36EnumsRecurrence;
  categoryId?: string; // Adjust based on your actual category type
}

const CreateLineItemForm: React.FC<CreateLineItemFormProps> = ({
  budgetId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [createLineItem] = useCreateLineItemMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      await createLineItem({
        budgetId,
        lineitemNoId: {
          name: data.name,
          amount: Number(data.amount),
          currency: data.currency,
          recurrence: data.recurrence ?? null,
          categoryId: data.categoryId ?? "",
        },
      }).unwrap();
      reset();
    } catch (error) {
      console.error("Failed to create line item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="p-2 flex flex-col md:flex-row gap-4 items-center justify-between">
        <label className="text-lg" htmlFor="currency">
          Currency
        </label>
        <select
          id="currency"
          {...register("currency", { required: "Currency is required" })}
          className="p-2 text-black bg-white rounded-md"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="DKK">DKK</option>
        </select>
        {errors.currency && (
          <span className="text-red-500">{errors.currency.message}</span>
        )}
      </div>
      <div className="p-2 flex flex-col md:flex-row gap-4 items-center justify-between">
        <label className="text-lg" htmlFor="recurrence">
          Recurrence
        </label>
        <select
          id="recurrence"
          {...register("recurrence")}
          className="p-2 text-black bg-white rounded-md"
        >
          <option value="">None</option> {/* Option for null */}
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
          <option value="YEARLY">YEARLY</option>
        </select>
        {errors.recurrence && (
          <span className="text-red-500">{errors.recurrence.message}</span>
        )}
      </div>
      <FormInput
        label="Category ID"
        name="categoryId"
        type="text"
        register={register}
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

export default CreateLineItemForm;
