import React from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream p-24">
      <div className="z-10 max-w-5xl w-full text-center">
        <Image
          src="/fitbook-logo.svg" // Replace with your FitBook logo
          alt="FitBook Logo"
          width={200}
          height={50}
          priority
        />
        <Text className="text-h1-desktop text-green my-6">
          Welcome to FitBook
        </Text>
        <Box className="w-full max-w-sm mx-auto p-8 bg-white shadow-md rounded-md">
          <Text className="text-h2-desktop text-black mb-6">
            Login to Your Account
          </Text>
          <Input placeholder="Email" mb="4" />
          <Input placeholder="Password" mb="6" type="password" />
          <Button colorScheme="green" width="full">
            Login
          </Button>
        </Box>
      </div>

      <footer className="fixed bottom-0 left-0 w-full h-24 border-t border-greyborder flex items-center justify-center">
        <p className="text-p-desktop text-black">
          © {new Date().getFullYear()} FitBook. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
