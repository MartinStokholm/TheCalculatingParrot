import { HTMLInputTypeAttribute, SelectHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute | "select";
  register: UseFormRegister<any>;
  validation?: object;
  error?: string;
  options?: { id: string; name: string }[];
} & React.InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement>;

export function FormInput({
  register,
  validation,
  label,
  name,
  error,
  type,
  options,
  ...rest
}: FormInputProps) {
  return (
    <div className="p-2 flex flex-col md:flex-row gap-4 items-center justify-between">
      <label className="text-lg" htmlFor={name}>
        {label}
      </label>

      {type === "select" ? (
        <select
          className="p-2 text-black bg-zinc-200 rounded-md"
          id={name}
          {...register(name, validation)}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="p-2 text-black bg-zinc-200 rounded-md"
          id={name}
          type={type}
          {...register(name, validation)}
          {...rest}
        />
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
