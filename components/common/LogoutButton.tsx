"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      buttonText="Logout"
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }}
    ></Button>
  );
};

export default LogoutButton;
