import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full h-24 border-t bg-darkcream border-greyborder flex items-center justify-center">
      <p className="text-green">
        © {new Date().getFullYear()} FitBook. All rights reserved.
      </p>
    </footer>
  );
};
