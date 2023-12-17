// "use client";
import "@/styles/globals.css";
import {Navbar} from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "@/contexts";
import { Poppins } from "next/font/google";
import HydrationHandler from "@/utils/hydrationHandler";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Fitbook",
  description: "Book fitness classes with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthContextProvider>
          <HydrationHandler>
            <ChakraProvider>
              <Toaster />
              <Navbar />
              {children}
              <Footer />
            </ChakraProvider>
          </HydrationHandler>
        </AuthContextProvider>
      </body>
    </html>
  );
}
