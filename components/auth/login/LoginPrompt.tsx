import Link from "next/link";
import React from "react";

export default function LoginPrompt() {
  return (
    <>
      <div className="mt-6 bg-white text-black px-3 md:px-8 py-4 rounded-2xl shadow-md w-full max-w-4xl">
        <div className="flex justify-between items-center">
          <p className="text-sm text-black whitespace-nowrap">
            Already have an Account?
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-3 hover:scale-105 duration-500 transition hover:border-[#c1cf16] border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c1cf16] whitespace-nowrap"
          >
            Login Here{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 ml-2 text-[#c1cf16]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
