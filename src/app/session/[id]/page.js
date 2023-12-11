// src/app/session/[id]/page.js
import { Box, Text, Flex, Button, Badge } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SessionDetailPage = ({ session }) => {
  return (
    <Box padding="6" bg="cream" minH="100vh">
      <Flex
        direction="column"
        align="center"
        maxW="container.md"
        marginX="auto"
      >
        <Text fontSize="h2-desktop" fontWeight="bold" color="green">
          {session.judul}
        </Text>
        <Badge
          colorScheme={session.status === "Ongoing" ? "green" : "red"}
          my="4"
        >
          {session.status}
        </Badge>
        <Text my="2" fontSize="p-desktop">
          {session.deskripsi}
        </Text>
        <Box my="4">
          <Text fontSize="p-desktop" fontWeight="bold">
            Trainer:
          </Text>
          <Text fontSize="p-desktop">{session.trainer.name}</Text>
          <Text fontSize="p-desktop">{session.trainer.bio}</Text>
        </Box>
        <Box my="4">
          <Text fontSize="p-desktop" fontWeight="bold">
            Schedule:
          </Text>
          <Text fontSize="p-desktop">
            {new Date(session.jadwalWaktu).toLocaleString()}
          </Text>
        </Box>
        <Box my="4">
          <Text fontSize="p-desktop" fontWeight="bold">
            Location:
          </Text>
          <Text fontSize="p-desktop">{session.lokasi}</Text>
        </Box>
        <Box my="4">
          <Text fontSize="p-desktop" fontWeight="bold">
            Participants:
          </Text>
          <Text fontSize="p-desktop">
            {session.currentParticipant} / {session.maxParticipant}
          </Text>
        </Box>
        {/* Additional session details */}
        <Button colorScheme="orange" mt="10">
          Join Class
        </Button>
      </Flex>
    </Box>
  );
};

export async function getServerSideProps({ params }) {
  // Here we simulate a server-side request with a dummy response
  // Replace this with your actual fetch call to the backend
  const dummyResponse = {
    judul: "Kelas Aerobik Mantap",
    deskripsi: "Membuat jantung dan badan sehat",
    trainer: {
      id: "ae3e25ee-ec54-4bbf-b2a5-e276563d66bd",
      role: "Trainer",
      name: "jarip",
      email: "useraja@gmail.com",
      displayName: "jaripcoy",
      noTelp: "021",
      bio: "halo ini bio",
      rating: null,
    },
    jadwalWaktu: "2023-12-21T19:00:00",
    lokasi: "JIM TERDEKAT CUY",
    maxParticipant: 20,
    currentParticipant: 0,
    status: "Ongoing",
  };

  return {
    props: {
      session: dummyResponse,
    },
  };
}

export default SessionDetailPage;
