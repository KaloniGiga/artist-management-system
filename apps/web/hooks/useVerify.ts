"use client";
import { useGetUserQuery } from "@web/redux/auth/auth.api";
import { setAuth, setLogout } from "@web/redux/auth/auth.slice";
import { useAppDispatch } from "@web/redux/hooks";
import { useEffect } from "react";

export default function useVerify() {
  const dispatch = useAppDispatch();
  const { isLoading, isFetching, data, error } = useGetUserQuery();

  useEffect(() => {
    if (data && !isFetching) {
      console.log("dispatch data to redux");
      dispatch(setAuth(data.data));
    }

    if (error && !isFetching) {
      console.log("dispatch logout");
      dispatch(setLogout());
    }
  }, [data, isFetching, error]);

  return { isLoading, data, error, isFetching };
}
