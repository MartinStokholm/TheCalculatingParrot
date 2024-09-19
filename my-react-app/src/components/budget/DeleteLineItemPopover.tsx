import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useDeleteLineItemMutation,
  useGetBudgetQuery,
} from "@/redux/api/endpoints/calculatingParrotApi";
import { useParams } from "react-router-dom";
import { PopoverClose } from "@radix-ui/react-popover";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";

type DeleteLineItemPopoverProps = {
  lineitemId: string;
  onCheckedChange: (value: boolean) => void;
};

export function DeleteLineItemPopover({
  lineitemId,
  onCheckedChange,
}: DeleteLineItemPopoverProps) {
  const { id } = useParams<{ id: string }>();
  const { refetch } = useGetBudgetQuery({ budgetId: id || "NaN" });
  const [deleteLineItem] = useDeleteLineItemMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteLineItem({ lineItemId: lineitemId }).unwrap();
      refetch();
      setIsOpen(false);
      onCheckedChange(false);
      toast.success("Line item deleted successfully");
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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          Delete <DeleteIcon className="ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-center">
          Are you sure you want to delete this item?
        </p>
        <p className="text-center font-thin italic mb-3 mt-2">
          This action cannot be undone.
        </p>
        <div className="flex justify-between">
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
          <PopoverClose>
            <Button onClick={handleCancel} variant={"ghost"}>
              Cancel
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
