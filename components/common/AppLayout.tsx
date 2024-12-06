"use client";
import { AuthProvider } from "@/context/AuthProvider";
import React from "react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}
const AppLayout = ({ children }: Props) => {
  return (
    <div>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </div>
  );
};

export default AppLayout;
