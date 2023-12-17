"use client";

import Link from "next/link";
import React from "react";

/**
 * @typedef {Object} NavLinkProps
 * @property {React.ReactNode} children
 * @property {boolean} isActive
 * @property {string} href
 * @property {string} [className]
 */

/**
 * @param {NavLinkProps} props
 */
export const NavLink = ({ children, isActive, href, className }) => {
  return (
    <div
      className={`hover:bg-darkcream hover:text-orange text-darkcream p-2 hover:rounded-lg ${
        isActive ? "border-greyborder border-b-2" : ""
      }`}
    >
      <Link
        href={href}
        className={`flex items-center font-semibold ${className}`}
      >
        {children}
      </Link>
    </div>
  );
};
