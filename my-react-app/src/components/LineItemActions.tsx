import React from "react";
import { Button } from "./Button"; // Adjust the import based on your project structure
import { LineItemWithCategory } from "../redux/api/endpoints/calculatingParrotApi"; // Adjust the import based on your project structure

interface LineItemActionsProps {
  currentLineItem: LineItemWithCategory | null;
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LineItemActions: React.FC<LineItemActionsProps> = ({
  currentLineItem,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!currentLineItem) return null;

  return (
    <div className="flex justify-between bg-white p-4 rounded-3xl shadow-md mx-4">
      <Button
        onClick={onSave}
        className="bg-blue-600 text-zinc-200 border-zinc-700 hover:bg-blue-500"
      >
        Save Changes
      </Button>
      <Button
        onClick={onCancel}
        className="bg-amber-600 text-zinc-200 border-zinc-700 hover:bg-amber-500"
      >
        Cancel
      </Button>
      <Button
        onClick={onDelete}
        className="bg-red-600 text-zinc-200 border-zinc-700 hover:bg-red-500"
      >
        Delete Line Item
      </Button>
    </div>
  );
};

export default LineItemActions;
