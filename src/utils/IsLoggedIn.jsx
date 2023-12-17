"use client";

import { useEffect } from "react";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

/**
 * @param {React.ComponentType} Component
 */
function IsLoggedIn(Component) {
  return function IsLoggedIn(props) {
    const { isAuthenticatedUser } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticatedUser) {
        router.replace("/login");
      }
    }, []);

    if (!isAuthenticatedUser) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default IsLoggedIn;