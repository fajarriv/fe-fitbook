import React from "react";
import { Box, Flex, Text, Button, SimpleGrid, Icon } from "@chakra-ui/react";
import { MdCheckCircle, MdCancel, MdEventAvailable } from "react-icons/md";

const TrainerDashboard = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "ongoing":
        return <Icon as={MdEventAvailable} color="green.500" />;
      case "completed":
        return <Icon as={MdCheckCircle} color="blue.500" />;
      case "cancelled":
        return <Icon as={MdCancel} color="red.500" />;
      default:
        return null;
    }
  };

  const classes = [
    {
      id: 1,
      name: "Yoga Beginners",
      status: "ongoing",
      schedule: "Mon & Wed at 10 AM",
    },
    {
      id: 2,
      name: "Pilates Intermediate",
      status: "completed",
      schedule: "Tue & Thu at 5 PM",
    },
    {
      id: 3,
      name: "HIIT Advanced",
      status: "cancelled",
      schedule: "Sat at 8 AM",
    },
  ];

  return (
    <Box bg="cream" minH="100vh" p={5}>
      <Flex flexDirection="column" alignItems="center">
        <Text
          fontSize="h2-desktop"
          fontWeight="700"
          fontFamily="poppins"
          color="green"
        >
          Trainer Dashboard
        </Text>
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
                {classInfo.name}
              </Text>
              <Flex alignItems="center" justifyContent="space-between" mt={3}>
                <Text fontSize="p-desktop" fontFamily="poppins">
                  Status:
                </Text>
                {getStatusIcon(classInfo.status)}
              </Flex>
              <Flex justifyContent="space-between" mt={5}>
                <Button colorScheme="green" size="sm">
                  Edit
                </Button>
                <Button colorScheme="blue" size="sm">
                  Participants
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default TrainerDashboard;
