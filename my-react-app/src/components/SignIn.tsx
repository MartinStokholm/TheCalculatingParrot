import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { FormSubmit } from "./FormSubmit";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt.types";
import { useSignInMutation } from "../redux/features/userApiSlice";

type SignInFormIputs = {
  email: string;
  password: string;
};

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormIputs>();

  const [signIn, { isLoading }] = useSignInMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: SignInFormIputs) => {
    setApiError(null);
    try {
      const token = await signIn(data).unwrap();
      const decodedToken = jwtDecode<JwtPayload>(token);
      succesfullSignInToast(decodedToken.username);

      if (token) {
        localStorage.setItem("token", token);
      }
    } catch (err) {
      setApiError("Failed to sign in. Please try again.");
    }
  };

  const succesfullSignInToast = (msg: string) =>
    toast.success("Succesfully signed in as " + msg);

  return (
    <form
      className="shadow-md flex flex-col p-4 gap-4 min-w-[500px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {apiError && <p className="text-red-500">apiError</p>}

      <FormInput
        label="Email"
        name="email"
        type="email"
        register={register}
        validation={{ required: "Email is required" }}
        error={errors.email?.message}
        placeholder="Enter your email"
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        register={register}
        validation={{ required: "Password is required" }}
        error={errors.password?.message}
        placeholder="********"
      />

      <FormSubmit
        isLoading={isLoading}
        submitText="Sign In"
        submittingText="Signing in..."
      />
    </form>
  );
}
