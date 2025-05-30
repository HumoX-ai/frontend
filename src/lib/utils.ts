import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Custom hook to get and set URL search params as state.
 * Returns [paramsObject, setParamsObject].
 * setParamsObject merges with current params and updates the URL.
 */
export function useQueryParams<T extends Record<string, unknown>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert URLSearchParams to plain object
  const paramsObj = Object.fromEntries(searchParams.entries()) as T;

  // Set params (merge with current)
  const setParams = useCallback(
    (newParams: Partial<T>) => {
      const merged = { ...paramsObj, ...newParams };
      // Remove empty string or undefined values
      Object.keys(merged).forEach((key) => {
        if (merged[key] === undefined || merged[key] === "") {
          delete merged[key];
        }
      });
      setSearchParams(new URLSearchParams(merged as Record<string, string>), {
        replace: true,
      });
    },
    [paramsObj, setSearchParams]
  );

  return [paramsObj, setParams] as const;
}
