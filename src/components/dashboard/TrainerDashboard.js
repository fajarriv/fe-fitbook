import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, SimpleGrid, Select } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useFetchWithToken from "@/hooks/fetchWithToken";

const TrainerDashboard = () => {
  const [status, setStatus] = useState("Ongoing");
  const [classes, setClasses] = useState([]);
  const router = useRouter();

  const fetchWithToken = useFetchWithToken();
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/trainer/sesi-kelas/${status}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setClasses(data.data || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
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
          Trainer Dashboard
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
          {classes.map((classInfo) => (
            <Box
              key={classInfo.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              bg="white"
              rounded="md"
            >
              <Text fontSize="p-desktop" fontWeight="500" fontFamily="poppins">
                {classInfo.judul}
              </Text>
              <Text mt={2} fontSize="p-desktop" fontFamily="poppins">
                {classInfo.deskripsi}
              </Text>
              <Text mt={2} fontSize="p-desktop" fontFamily="poppins">
                Schedule: {classInfo.jadwalWaktu}
              </Text>
              <Text mt={2} fontSize="p-desktop" fontFamily="poppins">
                Participants: {classInfo.currentParticipant} /{" "}
                {classInfo.maxParticipant}
              </Text>
              <Button
                colorScheme="blue"
                size="sm"
                mt={3}
                onClick={() => viewDetails(classInfo.id)}
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

export default TrainerDashboard;
