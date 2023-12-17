"use client";
import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, SimpleGrid, Select } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useFetchWithToken from "@/hooks/fetchWithToken";

const ClientDashboard = () => {
  const [status, setStatus] = useState("Ongoing");
  const [orders, setOrders] = useState([]); // Renamed to orders for clarity
  const router = useRouter();
  const fetchWithToken = useFetchWithToken();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/user/pesanan/${status}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [status]);

  const viewDetails = (classId) => {
    router.push(`detailKelas/${classId}`);
  };

  return (
    <Box bg="cream" minH="100vh" p={5} paddingTop={20}>
      <Flex flexDirection="column" alignItems="center">
        <Text
          fontSize="h2-desktop"
          fontWeight="700"
          fontFamily="poppins"
          color="green"
        >
          Client Dashboard
        </Text>
        <Select
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Select status"
          mt={5}
          width="auto"
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Select>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={10}>
          {orders.map((order) => (
            <Box
              key={order.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              bg="white"
              rounded="md"
            >
              <Text fontSize="p-desktop" fontWeight="500" fontFamily="poppins">
                {order.sesiKelas.judul}
              </Text>
              <Text mt={2} fontSize="p-desktop" fontFamily="poppins">
                {order.sesiKelas.deskripsi}
              </Text>
              <Text mt={2} fontSize="p-desktop" fontFamily="poppins">
                Schedule: {order.sesiKelas.jadwalWaktu}
              </Text>
              <Text mt={2} fontSize="p-desktop" fontFamily="poppins">
                Participants: {order.sesiKelas.currentParticipant} /{" "}
                {order.sesiKelas.maxParticipant}
              </Text>
              <Button
                colorScheme="blue"
                size="sm"
                mt={3}
                onClick={() => viewDetails(order.sesiKelas.id)}
              >
                View Details
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default ClientDashboard;
