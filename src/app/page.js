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
          <Text className="text-h1-desktop text-green mt-6 mb-12">
            Welcome to FitBook
          </Text>
          <LoginForm />
        </Box>
      </main>
    </>
  );
}
