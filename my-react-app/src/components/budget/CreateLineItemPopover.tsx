import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  $36EnumsCurrency,
  $36EnumsRecurrence,
  useCreateLineItemMutation,
  useGetCategoriesQuery,
} from "@/redux/api/endpoints/calculatingParrotApi";
import { LoadingSpinner } from "@/components/state/LoadingSpinner";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z.number(),
  recurrence: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "ONCE"], {
    message: "Recurrence is required",
  }),
  currency: z.enum(["USD", "EUR", "DKK"], { message: "Currency is required" }),
  categoryId: z.string().min(0, { message: "Category is required" }),
});

type CreateLineItemPopoverProps = {
  budgetId: string;
  refetch: () => void;
};

export function CreateLineItemPopover({
  budgetId,
  refetch,
}: CreateLineItemPopoverProps) {
  const recurrenceOptions: $36EnumsRecurrence[] = [
    "DAILY",
    "WEEKLY",
    "MONTHLY",
    "YEARLY",
    "ONCE",
  ];
  const currencyOptions: $36EnumsCurrency[] = ["USD", "EUR", "DKK"];
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Expenses have a negative amount",
      amount: -100,
      recurrence: "ONCE",
      currency: "DKK",
      categoryId: "",
    },
  });

  const [createLineItem] = useCreateLineItemMutation();
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createLineItem({
        budgetId,
        lineItemCreate: {
          name: values.name,
          amount: values.amount,
          currency: values.currency,
          recurrence: values.recurrence,
          categoryId: values.categoryId,
        },
      }).unwrap();
      form.reset();
      refetch();
      toast.success("Line item created successfully");
      setIsOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Failed to create line item: " + error.message);
      } else {
        toast.error("Failed to create line item");
      }
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"default"}>Create Line Item</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recurrence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurrence</FormLabel>
                  <FormControl>
                    <Select {...field} name="recurrence">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a recurrence" />
                      </SelectTrigger>
                      <SelectContent>
                        {recurrenceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Select {...field} name="currency">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    {categoriesLoading ? (
                      <LoadingSpinner />
                    ) : categoriesError ? (
                      <p className="text-red-500">Error loading categories</p>
                    ) : (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        name="categoryId"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between pt-4">
              <Button variant={"default"} type="submit">
                Create
              </Button>
              <PopoverClose>
                <Button onClick={handleCancel} variant={"ghost"} type="reset">
                  Cancel
                </Button>
              </PopoverClose>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
