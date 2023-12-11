'use client'
import { useEffect, useState } from 'react'
import { Button, Input } from '@chakra-ui/react'

export default function UpdateProfilePage() {
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newBio, setNewBio] = useState('')
  const [newNoTelp, setNewNoTelp] = useState('')



  const handleProfileUpdate = async (e) => {
    e.preventDefault()

    try {
    } catch (error) {
    } 
  }

  return (
    <div className="flex justify-center flex-col my-5 w-1/2 animate__animated animate__fadeInUp">
      <h2 className="text-3xl font-bold mb-5 mt-24">Profile</h2>
      <div className="shadow dark:shadow dark:bg-black dark:shadow-gray-950 w-full rounded bg-white p-8">
        <form className="space-y-4 md:space-y-6" onSubmit={handleProfileUpdate}>
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="displayName"
            isRequired
            label="DisplayName"
            labelPlacement="outside"
            name="username"
            onChange={(e) => setNewDisplayName(e.target.value)}
            placeholder="Display Name"
            type="text"
            value={newDisplayName}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="bio"
            isRequired
            label="Bio"
            labelPlacement="outside"
            name="bio"
            onChange={(e) => setNewBio(e.target.value)}
            placeholder="Bio"
            type="text"
            value={newBio}
          />
          <Input
            className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="noTelp"
            isRequired
            label="No Telp"
            labelPlacement="outside"
            name="no telp"
            onChange={(e) => setNewNoTelp(e.target.value)}
            placeholder="No Telp"
            type="text"
            value={newNoTelp}
          />
          <Button color="primary" type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}
