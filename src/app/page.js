"use client";
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Text,
  Button,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useFetchWithToken from "@/hooks/fetchWithToken";
import { useAuthContext } from "@/contexts";
import IsLoggedIn from "@/utils/IsLoggedIn";

const Home = () => {
  const { isAuthenticated } = useAuthContext();
  const [daftarKelas, setDaftarKelas] = useState([]);
  const [orderedClasses, setOrderedClasses] = useState([]); // Array of IDs of ordered classes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState(null);
  const fetchWithToken = useFetchWithToken();
  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push("/login");
    // }
    // Fetch class list
    const fetchClassList = async () => {
      try {
        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/sesi-kelas`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setDaftarKelas(data.data || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    // Fetch user's orders
    const fetchOrders = async () => {
      try {
        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/user/pesanan/Ongoing`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrderedClasses(data.data.map((order) => order.sesiKelas.id));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchClassList();
    fetchOrders();
  }, []);

  const orderClassConfirmation = (kelas) => {
    setSelectedClass(kelas);
    onOpen();
  };
  const isClassOrdered = (classId) => {
    return orderedClasses.includes(classId);
  };

  const handleOrder = async (classId) => {
    try {
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/pesanan/${classId}`,
        "POST"
      );
      if (response.ok) {
        // Handle successful order
        router.push("/dashboard");
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Error ordering class:", error);
    }
  };

  const handleCancelOrder = (classId) => {
    // Implement cancel order logic
    // Redirect to dashboard after canceling
    router.push("/dashboard");
  };

  const handleCardClick = (kelasId) => {
    router.push(`/detailKelas/${kelasId}`);
  };

  const isPastClass = (jadwalWaktu) => {
    return new Date(jadwalWaktu) < new Date();
  };

  return (
    <Box
      className="container mx-auto mt-10"
      paddingTop={10}
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        mb={5}
      >
        Daftar Kelas
      </Text>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {`Lanjutkan untuk pesan kelas ${selectedClass?.judul}?`}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleOrder(selectedClass?.id)}
            >
              Konfirmasi
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Batalkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={4}>
        {daftarKelas.map((kelas) => (
          <Box
            key={kelas.id}
            bg={isPastClass(kelas.jadwalWaktu) ? "gray.200" : "white"}
            shadow="md"
            rounded="lg"
            p={4}
            w="full"
            cursor="pointer"
            _hover={{ transform: "scale(1.05)" }}
            transition="ease-in-out 0.3s"
          >
            <Text
              color="gray.500"
              fontWeight="semibold"
              mb={2}
            >
              {kelas.judul}
            </Text>
            <Text
              color="gray.600"
              mb={2}
            >
              {kelas.deskripsi}
            </Text>
            <Text color="gray.500">Jadwal: {kelas.jadwalWaktu}</Text>
            <Box
              mt={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="gray.500">
                Participants: {kelas.currentParticipant}/{kelas.maxParticipant}
              </Text>
              <Button
                colorScheme={isClassOrdered(kelas.id) ? "red" : "green"}
                onClick={() =>
                  isClassOrdered(kelas.id)
                    ? handleCancelOrder(kelas.id)
                    : orderClassConfirmation(kelas)
                }
              >
                {isClassOrdered(kelas.id) ? "Batalkan Pesanan" : "Pesan"}
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => router.push(`/detailKelas/${kelas.id}`)}
              >
                View Class Details
              </Button>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default IsLoggedIn(Home);