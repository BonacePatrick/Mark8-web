import React from "react";

interface Props {
  message: string;
}

export default function Loading({ message }: Props) {
  return (
    <>
      <div
        className="py-0 whitespace-nowrap px-0 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#c1cf16] text-white hover:bg-[#c1cf16] focus:outline-none focus:bg-[#c1cf16] disabled:opacity-50 disabled:pointer-events-none"
      >
        <span
          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></span>
        <span className="hidden md:inline-block">{message}</span>
      </div>
    </>
  );
}

