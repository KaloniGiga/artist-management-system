import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedErrorResponse } from "@web/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function extractMessageFromError(
  error: FetchBaseQueryError | SerializedError,
) {
  if ("result" in error) {
    return (error as SerializedErrorResponse).result.response
      ? (error as SerializedErrorResponse).result.response.message
      : "";
  } else if ("message" in error) {
    return error.message;
  } else if (isFetchBaseQueryError(error)) {
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    return errMsg;
  }
}
