"use client";

import { useAuth } from "@/context/AuthProvider";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuth(true);
    else setAuth(false);
  }, [pathname]);

  if (auth) {
    return (
      <div className="px-4 mt-6 mb-6 flex justify-end">
        <LogoutButton />
      </div>
    );
  } else return null;
};

export default Header;
