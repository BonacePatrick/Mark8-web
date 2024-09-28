"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FiLock, FiMail } from "react-icons/fi";
import * as z from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Loading from "@/components/Load-indicator/Loading";
import { useAuthStore } from "@/stores/auth-stores/authStore";
import apiClient from "@/services/api-client";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setTokens, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginFormData>({
    mutationFn: (data) =>
      apiClient()
        .post<LoginResponse>("/auth/login", data)
        .then((response) => response.data),
    onSuccess: (data: LoginResponse) => {
      const { accessToken, refreshToken } = data.data;
      if (accessToken && refreshToken) {
        setTokens(accessToken, refreshToken);
        localStorage.setItem("user-token", accessToken);
        localStorage.setItem("user-refresh-token", refreshToken);
        apiClient().defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        const userData = {
          id: data.data.id,
          email: data.data.email,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        };
        setUser(userData);
        toast.success("Login successfully");
        router.push("/");
      } else {
        setError("Login");
      }
      toast.success("Logged in successfully");
      router.push("/");
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as
        | { message: string | string[]; errors?: { [key: string]: string[] } }
        | undefined;
      const errorMessage = Array.isArray(errorData?.message)
        ? errorData?.message[0]
        : errorData?.message ||
          Object.entries(errorData?.errors || {})
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .reduce((acc, [_, value]) => [...acc, ...value], [] as string[])
            .join(", ") ||
          "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setError(null);
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black mb-1"
        >
          Email
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16]" />
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="focus:ring-[#c1cf16] text-black focus:border-[#c1cf16] block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-md bg-gray-50"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black mb-1"
        >
          Password
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16]" />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            className="focus:ring-[#c1cf16] text-black focus:border-[#c1cf16] block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-md bg-gray-50"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-gray-500"
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
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a href="#" className="font-medium hover:text-gray-600">
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#c1cf16] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c0cf16f8]"
        >
          {loginMutation.isPending ? <Loading message="Logging in" /> : "Login"}
        </button>
      </div>
    </form>
  );
}
