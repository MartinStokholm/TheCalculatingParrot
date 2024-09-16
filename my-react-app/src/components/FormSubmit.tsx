type FormSubmitProps = {
  submitText: string;
  submittingText: string;
  isLoading: boolean;
};
export function FormSubmit({
  isLoading,
  submitText,
  submittingText,
}: FormSubmitProps) {
  return (
    <button
      className="rounded-md px-4 py-2 bg-blue-600 text-zinc-200 border-b-4 border-zinc-700 hover:border-b-zinc-200 hover:bg-blue-500 hover:text-zinc-300 w-full"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? submittingText : submitText}
    </button>
  );
}
