"use client";
import { useGetUserQuery } from "@web/redux/auth/auth.api";
import { setAuth } from "@web/redux/auth/auth.slice";
import { useAppDispatch } from "@web/redux/hooks";
import { useEffect } from "react";

export default function useVerify() {
  const dispatch = useAppDispatch();
  const { isLoading, isFetching, data, error } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      dispatch(setAuth());
    }
  }, [data]);

  return { isLoading, data, error, isFetching };
}
