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
      className="rounded-md px-4 py-2 bg-blue-600 text-white"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? submittingText : submitText}
    </button>
  );
}
