import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  register: UseFormRegister<any>;
  validation?: object;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormInput({
  register,
  validation,
  label,
  name,
  error,
  type,
  ...rest
}: FormInputProps) {
  return (
    <div className="p-2 flex flex-col md:flex-row gap-4 items-center justify-between">
      <label className=" text-lg" htmlFor={name}>
        {label}
      </label>

      <input
        className="p-2 text-black bg-white rounded-md"
        id={name}
        type={type}
        {...register(name, validation)}
        {...rest}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
