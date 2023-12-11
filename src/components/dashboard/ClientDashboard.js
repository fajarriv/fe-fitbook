import React from "react";
import { Box, Flex, Text, Button, SimpleGrid, Icon } from "@chakra-ui/react";
import { MdCheckCircle, MdCancel, MdEventAvailable } from "react-icons/md";

const Dashboard = () => {
  // Dummy data for booked classes
  const bookedClasses = [
    {
      id: 1,
      name: "Yoga Beginners",
      status: "ongoing",
    },
    {
      id: 2,
      name: "Pilates Intermediate",
      status: "completed",
    },
    {
      id: 3,
      name: "HIIT Advanced",
      status: "cancelled",
    },
  ];

  const getStatusIcon = (status) => {
    if (status === "ongoing")
      return <Icon as={MdEventAvailable} color="green.500" />;
    if (status === "completed")
      return <Icon as={MdCheckCircle} color="blue.500" />;
    if (status === "cancelled") return <Icon as={MdCancel} color="red.500" />;
  };

  return (
    <Box className="bg-cream min-h-screen p-5">
      <Flex flexDirection="column" alignItems="center">
        <Text
          fontSize="h2-desktop"
          fontWeight="700"
          fontFamily="poppins"
          className="text-green"
        >
          Your Dashboard
        </Text>
        <SimpleGrid columns={3} spacing={10} mt={10}>
          {bookedClasses.map((classInfo) => (
            <Box
              key={classInfo.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              className="rounded-md"
              bg="white"
            >
              <Text fontSize="p-desktop" fontWeight="500" fontFamily="poppins">
                {classInfo.name}
              </Text>
              <Flex alignItems="center" justifyContent="space-between" mt={3}>
                <Text fontSize="p-desktop" fontFamily="poppins">
                  Status:
                </Text>
                {getStatusIcon(classInfo.status)}
              </Flex>
              <Button colorScheme="green" mt={5} size="sm">
                View Details
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Dashboard;
