"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import LoginForm from "@/components/elements/LoginForm"; // Make sure the path is correct

export default function Home() {
  return (
    <>
      {/* Navbar goes here */}
      <main className="flex flex-col min-h-screen justify-center items-center bg-cream pt-24 pb-24">
        <Box className="text-center">
          <Image
            src="/fitbook-logo.svg" // Replace with your actual path to the FitBook logo
            alt="FitBook Logo"
            width={200}
            height={50}
            priority
          />
          <Text className="text-h1-desktop text-green mt-6 mb-12">
            Welcome to FitBook
          </Text>
          <LoginForm />
        </Box>
      </main>
      <footer className="w-full h-24 border-t border-greyborder flex items-center justify-center">
        <p className="text-p-desktop text-black">
          © {new Date().getFullYear()} FitBook. All rights reserved.
        </p>
      </footer>
    </>
  );
}
