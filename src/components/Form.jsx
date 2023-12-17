"use client";
import { useState } from "react";
import { Button, Input, Select } from "@chakra-ui/react";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function Form({
  title,
  buttonText,
  signText,
  signLink,
  signHref,
}) {
  const { register } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      let userData = {
        name,
        email,
        password,
        noTelp,
        displayName,
        role,
      };

      if (role === "Trainer") {
        userData = {
          ...userData,
          bio,
        };
        await register(name, email, password, noTelp, displayName, role, bio);
      } else {
        await register(name, email, password, noTelp, displayName, role);
      }

      router.push("/dashboard");
      console.log(userData);
    } catch (error) {
      console.error(
        "Registration failed. Please check your information.",
        error
      );
    }
  };

  const handleRoleChange = (value) => {
    setRole(value);
    if (value !== "Trainer") {
      setBio("");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          {title}
        </h1>

        <form
          className="space-y-4 md:space-y-6"
          onSubmit={registerHandler}
        >
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            id="username"
            isRequired
            label="Username"
            labelPlacement="outside"
            name="username"
            onChange={(e) => setName(e.target.value)}
            placeholder="username"
            type="username"
            value={name}
          />

          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            id="email"
            isRequired
            label="Email Address"
            labelPlacement="outside"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            type="email"
            value={email}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            id="password"
            isRequired
            label="Password"
            labelPlacement="outside"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="your password"
            type="password"
            value={password}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            id="noTelp"
            isRequired
            label="Phone Number"
            labelPlacement="outside"
            name="noTelp"
            onChange={(e) => setNoTelp(e.target.value)}
            placeholder="Your Phone Number"
            type="text"
            value={noTelp}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            id="displayName"
            isRequired
            label="Display Name"
            labelPlacement="outside"
            name="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Display Name"
            type="text"
            value={displayName}
          />
          <Select
            placeholder="Select Role"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Trainer">Trainer</option>
            <option value="Admin">Admin</option>
          </Select>
          {role === "Trainer" && (
            <Input
              className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              id="bio"
              label="Bio"
              labelPlacement="outside"
              name="bio"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your Bio"
              type="text"
              value={bio}
            />
          )}
          <button
            className="w-full font-semibold hover:bg-darkcream hover:text-orange bg-orange text-darkcream p-2 rounded-lg"
            onClick={registerHandler}
          >
            {buttonText}
          </button>
          <p className="text-sm font-light text-gray-500">
            {signText}
            <a
              className="font-medium text-primary-600 hover:underline"
              href={signHref}
            >
              {signLink}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
