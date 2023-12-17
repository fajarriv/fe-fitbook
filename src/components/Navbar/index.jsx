"use client";

import Link from "next/link";
import React from "react";
import { NavLink } from "./Navlink";
import { useAuthContext } from "@/contexts";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const { pengguna, isAuthenticated } = useAuthContext();
  console.log(pengguna);
  const pathname = usePathname();
  return (
    <nav className="z-[50] bg-green sticky w-full top-0 shadow-2xl">
      <div className="px-12 py-5 flex items-center mx-auto">
        <Link href="/">
          <h2 className="text-darkcream">Fitbook</h2>
        </Link>
        <div className="ml-auto flex flex-row items-center gap-4">
          {isAuthenticated ? (
            <>
              <NavLink
                href="/"
                isActive={pathname === "/"}
              >
                Home
              </NavLink>

              {pengguna.role !== "Admin" && (
                <NavLink
                  href="/dashboard"
                  isActive={pathname === "/dashboard"}
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                href="/laporan"
                isActive={pathname === "/laporan"}
              >
                Laporan
              </NavLink>
              <NavLink
                href="/profile"
                isActive={pathname === "/profile"}
              >
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                href="/login"
                isActive={pathname === "/login"}
              >
                Login
              </NavLink>
              <NavLink
                href="/register"
                isActive={pathname === "/register"}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
