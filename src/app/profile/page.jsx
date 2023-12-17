'use client'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/authContext'
import { useToken } from '@/hooks/useToken'
import { useRouter } from 'next/navigation'
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'

export default function Profile() {
  const { pengguna } = useAuthContext()
  const { getPenggunaToken } = useToken()
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    let role = ''
    if (pengguna.role == 'Trainer') {
      role = 'trainer'
    } else {
      role = 'user'
    }
    const fetchProfile = async () => {
      try {
        const token = getPenggunaToken()
        console.log(token)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${role}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.ok) {
          console.log('response ok')
          const data = await response.json()
          console.log(data.data)
          setUserData(data.data)
        } else {
          console.log(await response)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (pengguna) {
      fetchProfile()
    }
  }, [])

  const handleRedirectToUpdateProfile = () => {
    router.push('/updateProfile')
  }

  return (
    <div className="flex justify-center flex-col my-5 w-1/2 animate__animated animate__fadeInUp">
      <h2 className="text-3xl font-bold mb-5 mt-24">Profile</h2>
      <div className="shadow w-full rounded bg-white p-8">
        <Text>Role: {userData?.role}</Text>
        <Text>Name: {userData?.name}</Text>
        <Text>Email: {userData?.email}</Text>
        <Text>Display Name: {userData?.displayName}</Text>
        <Text>Phone Number: {userData?.noTelp}</Text>
        {userData?.role === 'Trainer' && <Text>Bio: {userData?.bio}</Text>}
        {userData?.role === 'Trainer' && (
          <Text>Rating: {userData?.rating}</Text>
        )}

        <Button
          onClick={handleRedirectToUpdateProfile}
          mt="4"
          colorScheme="blue"
          variant="solid"
          size="md"
          borderRadius="md"
        >
          Update Profile
        </Button>
      </div>
    </div>
  )
}
