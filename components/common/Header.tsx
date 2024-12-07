"use client";

import { useAuth } from "@/context/AuthProvider";
import LogoutButton from "./LogoutButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuth(true);
    else setAuth(false);
  }, [pathname]);

  return (
    <div className="px-4 mt-2 mb-4 flex items-center justify-end gap-3">
      <Button
        buttonText="Home"
        onClick={() => {
          router.push("/");
        }}
      />
      <Button
        buttonText="Jobs"
        onClick={() => {
          router.push("/job-listing");
        }}
      />
      {auth && <LogoutButton />}
    </div>
  );
};

export default Header;
