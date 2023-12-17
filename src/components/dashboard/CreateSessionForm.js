import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import useFetchWithToken from "@/hooks/fetchWithToken";
import { useRouter, usePathname } from "next/navigation";

const CreateSessionForm = ({ onClose }) => {
  const fetchWithToken = useFetchWithToken();
  const router = useRouter();
  const pathName = usePathname();

  const refreshData = () => {
    router.replace(pathName);
  };

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    jadwalWaktu: "",
    lokasi: "",
    maxParticipant: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [year, month, dayTime] = formData.jadwalWaktu.split("-");
      const [day, time] = dayTime.split("T");
      const formattedJadwalWaktu = `${day}-${month}-${year} ${time}`;
      const payload = {
        ...formData,
        jadwalWaktu: formattedJadwalWaktu,
        maxParticipant: parseInt(formData.maxParticipant, 10),
      };

      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/sesi-kelas`,
        "POST",
        payload
      );

      if (response.ok) {
        toast({
          title: "Class created successfully.",
          status: "success",
          duration: 2500,
          isClosable: true,
          onCloseComplete: refreshData,
        });
        onClose(); // Close the modal after successful submission
      } else {
        const errorData = await response.json(); // Assuming the server returns JSON error details
        toast({
          title: "Error creating class.",
          description: errorData.message || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error creating class:", error);
      toast({
        title: "Error creating class.",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="judul">Judul</FormLabel>
        <Input
          id="judul"
          name="judul"
          onChange={handleChange}
          value={formData.judul}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel htmlFor="deskripsi">Deskripsi</FormLabel>
        <Textarea
          id="deskripsi"
          name="deskripsi"
          onChange={handleChange}
          value={formData.deskripsi}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel htmlFor="jadwalWaktu">Jadwal Waktu</FormLabel>
        <Input
          id="jadwalWaktu"
          name="jadwalWaktu"
          type="datetime-local"
          onChange={handleChange}
          value={formData.jadwalWaktu}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel htmlFor="lokasi">Lokasi</FormLabel>
        <Input
          id="lokasi"
          name="lokasi"
          onChange={handleChange}
          value={formData.lokasi}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel htmlFor="maxParticipant">Max Participant</FormLabel>
        <Input
          id="maxParticipant"
          name="maxParticipant"
          type="number"
          onChange={handleChange}
          value={formData.maxParticipant}
        />
      </FormControl>

      <Button mt={6} colorScheme="blue" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default CreateSessionForm;
