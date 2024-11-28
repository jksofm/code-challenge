import React from "react";

export function Loading() {
  return (
    <div className="min-h-[700px] flex items-center justify-center w-full">
      <div className="flex flex-row gap-2">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    </div>
  );
}
