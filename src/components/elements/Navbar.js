import { Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <Flex
      as="header"
      position="absolute"
      top="0"
      width="full"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="#0C4C4C"
      color="white"
      zIndex={1000} // Use a high numeric value for zIndex
    >
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          FitBook
        </Text>
      </Flex>

      <Flex align="center">
        <Link href="/dashboard" passHref>
          <Button as="a" variant="ghost" mr={3}>
            Dashboard
          </Button>
        </Link>
        <Link href="/daftarKelas" passHref>
          <Button as="a" variant="ghost" mr={3}>
            Daftar Kelas
          </Button>
        </Link>
        <Link href="/updateProfile" passHref>
          <Button as="a" variant="ghost">
            Update Profile
          </Button>
        </Link>
        <Link href="/laporan" passHref>
          <Button as="a" variant="ghost">
            Laporan
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
