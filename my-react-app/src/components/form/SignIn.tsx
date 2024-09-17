import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FormInput } from "./FormInput";
import { FormSubmit } from "./FormSubmit";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../types/jwt.types";
import { setToken } from "../../utils/jwt.utils";
import { setAuth } from "../../redux/api/authSlice";
import {
  useLoginMutation,
  UserLogin,
} from "../../redux/api/endpoints/calculatingParrotApi";
import { Title, TitleSizes } from "../common/Title";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const [signIn, { isLoading }] = useLoginMutation();
  const [apiError, setApiError] = useState<string | null>(null);
  const dispatch = useDispatch(); // Get the dispatch function

  const onSubmit = async (data: UserLogin) => {
    setApiError(null);
    try {
      // Call the signIn mutation and unwrap the result
      const response = await signIn({ userLogin: data }).unwrap();

      // Get the token from the response
      const token = response.token;

      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);

        succesfullSignInToast(decodedToken.username);

        setToken(token); // Store the token in localStorage

        dispatch(setAuth({ token, user: decodedToken })); // Dispatch the action to update auth state
      }
    } catch (err) {
      setApiError("Failed to sign in. Please try again.");
    }
  };

  const succesfullSignInToast = (msg: string) =>
    toast.success("Successfully signed in as " + msg);

  return (
    <>
      <Title
        size={TitleSizes.Large}
        text="Please sign in below to enable stuff"
      />

      <form
        className="shadow-md flex flex-col p-4 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        {apiError && <p className="text-red-500">{apiError}</p>}
      </form>
    </>
  );
}
