"use client";

import Loading from "@/components/Load-indicator/Loading";
import apiClient from "@/services/api-client";
import { useAuthStore } from "@/stores/auth-stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import * as z from "zod";
import { LoginResponse } from "../login/LoginForm";

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupResponse {
  status: number;
  message: string;
  data: {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    refreshToken: string;
  };
}

export default function RegisterForm() {
  const router = useRouter();
  const { setUser, setTokens } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useMutation<
    LoginResponse,
    AxiosError,
    SignupFormData
  >({
    mutationFn: (data: SignupFormData) =>
      apiClient().post<SignupResponse>("/auth/signup", data)
        .then(() => apiClient().post<LoginResponse>("/auth/login",{email:data.email,password:data.password})).then((response)=>response.data),
    onSuccess: (successData) => {
      const { accessToken, refreshToken } = successData.data;
      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken);
        localStorage.setItem("user-token", accessToken)
        localStorage.setItem("user-refresh-token", refreshToken)
        apiClient().defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        const userData = {
          id: successData.data.id,
          email: successData.data.email,
          firstName: successData.data.firstName,
          lastName: successData.data.lastName,
        };
        setUser(userData);
        toast.success("Registered successfully");
        router.push("/");
      } else {
        setError(
          "Registration failed. Please try again later."
        );
      }
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as
        | { message: string | string[]; errors?: { [key: string]: string[] } }
        | undefined;
      const errorMessage = Array.isArray(errorData?.message)
        ? errorData?.message[0]
        : errorData?.message ||
          Object.entries(errorData?.errors || {}).reduce(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (acc, [_, value]) => [...acc, ...value],
            [] as string[]
          ).join(", ") ||
          "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    setError(null);
    signupMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black"
        >
          Email
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16]" />
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter email"
            className="focus:ring-[#c1cf16] focus:border-[#c1cf16] block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black"
        >
          Password
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16]" />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            className="focus:ring-[#c1cf16] focus:border-[#c1cf16] block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-md bg-gray-50"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
          >
            {showPassword ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-black"
        >
          First Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16]" />
          <input
            {...register("firstName")}
            type="text"
            id="firstName"
            placeholder="Enter first name"
            className="focus:ring-[#c1cf16] focus:border-[#c1cf16] block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-black"
        >
          Last Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16]" />
          <input
            {...register("lastName")}
            type="text"
            id="lastName"
            placeholder="Enter last name"
            className="focus:ring-[#c1cf16] focus:border-[#c1cf16] block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-black"
        >
          Phone Number
        </label>
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16]" />
          <input
            {...register("phoneNumber")}
            type="tel"
            id="phoneNumber"
            placeholder="Enter phone number"
            className="focus:ring-[#c1cf16] focus:border-[#c1cf16] block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C1CF16] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {signupMutation.isPending ? (
            <Loading message="Signing Up" />
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
}
