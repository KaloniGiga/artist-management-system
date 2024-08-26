/* eslint-disable @typescript-eslint/no-explicit-any */
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    "data" in error
  );
}

/**
 * @function: extracts the message from the error
 */
export function extractMessageFromError(
  error: FetchBaseQueryError | SerializedError,
) {
  if (isFetchBaseQueryError(error)) {
    return "error" in error
      ? error.error
      : error.data instanceof String
        ? error.data
        : "message" in (error.data as any)
          ? (error.data as any).message
          : "";
  } else if ("result" in error) {
    return "message" in (error.result as any)
      ? (error.result as any).message
      : (error.result as any).response.message;
  } else if ("message" in error) {
    return error.message;
  }
}
