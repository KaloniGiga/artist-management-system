"use client";
import { User, UserContextProps } from "@web/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const UserRegisterFormContext = createContext<UserContextProps | null>({
  user: null,
  updateUser: () => null,
});

export function UserRegisterFormContextProvier({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (values: Partial<User>) => {
    setUser({ ...user, ...values });
  };

  return (
    <UserRegisterFormContext.Provider value={{ user, updateUser }}>
      {children}
    </UserRegisterFormContext.Provider>
  );
}

export const useRegisterUserFormContext = () => {
  const context = useContext(UserRegisterFormContext);
  if (!context) {
    throw new Error("useRegisterFormContext must be available");
  }
  return context;
};
