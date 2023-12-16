// LoginForm.js

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuthContext } from "@/contexts/authContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Your login logic here
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthContext();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="auto" // Adjusted for auto height
      width="100vw"
      paddingY="20" // Added vertical padding
    >
      <Box
        bg="#FFFFFF"
        borderRadius="lg"
        p={8}
        shadow="md"
        width={{ base: "90%", sm: "480px" }} // Adjusted for responsive width
      >
        <Stack spacing={4}>
          <Text
            fontSize="2xl"
            textAlign="center"
          >
            Login
          </Text>
          <FormControl isInvalid={!!errors.username}>
            <Input
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <Divider borderColor="gray.300" />
          <FormControl isInvalid={!!errors.password}>
            <InputGroup>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <BsEyeSlash /> : <BsEye />}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
            onClick={() => login(email, password)}
            width="full"
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginForm;
