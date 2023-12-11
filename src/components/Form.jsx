'use client'
import { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'

export default function Form({
  title,
  buttonText,
  signText,
  signLink,
  signHref,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [noTelp, setNoTelp] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')

  const registerHandler = async (e) => {
    e.preventDefault()
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
        noTelp: noTelp,
        displayName: displayName,
        role: role,
        bio: bio,
      }
      // register ke api backend
    } catch (error) {
      setError('Registration failed. Please check your information.')
    } 
  }

 
  return (
    <div className="w-full bg-white rounded-lg shadow dark:shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:shadow-gray-950">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {title}
        </h1>
       
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={title === 'Sign Up' ? registerHandler : registerHandler}
        >
          {title === 'Sign Up' && (
            <Input
              className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          )}
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="role"
            isRequired
            label="Role"
            labelPlacement="outside"
            name="role"
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your Role"
            type="text"
            value={role}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="bio"
            isRequired
            label="Bio"
            labelPlacement="outside"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            placeholder="Your Bio"
            type="text"
            value={bio}
          />
        
          <Button
            color="primary"
            onClick={(e) => {
              e.preventDefault()
              title === 'Sign Up' ? registerHandler(e) : loginHandler(e)
            }}
          >
            {buttonText}
          </Button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {signText}
            <a
              className="dark:text-primary-500 font-medium hover:underline text-primary-600"
              href={signHref}
            >
              {signLink}
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
