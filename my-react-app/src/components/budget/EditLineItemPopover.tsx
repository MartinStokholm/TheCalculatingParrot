import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  LineItemWithCategory,
  useGetCategoriesQuery,
  useUpdateLineItemMutation,
  $36EnumsRecurrence,
  $36EnumsCurrency,
  useGetBudgetQuery,
} from "@/redux/api/endpoints/calculatingParrotApi";
import { useState } from "react";
import { LoadingSpinner } from "../state/LoadingSpinner";
import { useParams } from "react-router-dom";
import { PopoverClose } from "@radix-ui/react-popover";

type EditLineitemPopoverProps = {
  lineitem: LineItemWithCategory;
  onCheckedChange: (value: boolean) => void;
};

export function EditLineitemPopover({
  lineitem,
  onCheckedChange,
}: EditLineitemPopoverProps) {
  const [formData, setFormData] = useState<LineItemWithCategory>(lineitem);
  const { id } = useParams<{ id: string }>();
  const { refetch } = useGetBudgetQuery({ budgetId: id || "NaN" });
  const [updateLineItem] = useUpdateLineItemMutation();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const handleCategoryChange = (value: string) => {
    const selectedCategory = categories?.find(
      (category) => category.name === value
    );
    if (selectedCategory) {
      setFormData((prevData) => ({
        ...prevData,
        category: selectedCategory,
        categoryId: selectedCategory.id,
      }));
    }
  };

  const handleEnumChange = (id: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLineItem({
        lineItemId: lineitem.id,
        lineItemCreate: formData,
      }).unwrap();
      toast.success("Line item updated");
      refetch();
      setIsOpen(false);
      onCheckedChange(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCheckedChange(false);
  };

  const recurrenceOptions: $36EnumsRecurrence[] = [
    "DAILY",
    "WEEKLY",
    "MONTHLY",
    "YEARLY",
    "ONCE",
  ];
  const currencyOptions: $36EnumsCurrency[] = ["USD", "EUR", "DKK"];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size={"sm"}>
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Line item</h4>
            <p className="text-sm text-muted-foreground">
              Change the details of the line items here.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="recurrence">Recurrence</Label>
              <Select
                value={formData.recurrence}
                onValueChange={(value) => handleEnumChange("recurrence", value)}
              >
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
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleEnumChange("currency", value)}
              >
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
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="category.name">Category</Label>
              {categoriesLoading ? (
                <LoadingSpinner />
              ) : categoriesError ? (
                <p className="col-span-2 text-red-500">
                  Error loading categories
                </p>
              ) : (
                <Select
                  value={formData.category.name}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <Button type="submit">Save</Button>
          <PopoverClose>
            <Button onClick={handleCancel} variant={"ghost"}>
              Cancel
            </Button>
          </PopoverClose>
        </form>
      </PopoverContent>
    </Popover>
  );
}
