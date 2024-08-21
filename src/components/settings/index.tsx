import { useRouter } from "next/router";
import React from "react";
import Cookies from "universal-cookie";

export default function Settings() {
  const router = useRouter();
  const cokkies = new Cookies(null, { path: "/" });

  const handleLogoutClick = () => {
    cokkies.remove("butsapp");
    router.push("/auth");
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
