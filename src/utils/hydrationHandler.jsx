"use client";

import React, { useEffect, useState } from "react";

/**
 * @typedef {Object} HydrationHandlerProps
 * @property {React.ReactNode} children
 */

/**
 * @param {HydrationHandlerProps} props
 */
const HydrationHandler = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default HydrationHandler;
