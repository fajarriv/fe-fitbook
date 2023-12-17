'use client'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/authContext'
import { useToken } from '@/hooks/useToken'

export default function Profile() {
  const { pengguna } = useAuthContext()
  const { getPenggunaToken } = useToken()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    let role = ''
    if(pengguna.role == 'Trainer'){
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
          console.log("response ok")
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

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p>ID: {userData?.id}</p>
        <p>Role: {userData?.role}</p>
        <p>Name: {userData?.name}</p>
        <p>Email: {userData?.email}</p>
        <p>Display Name: {userData?.displayName}</p>
        <p>Phone Number: {userData?.noTelp}</p>
        {userData?.role === 'Trainer' && <p>Bio: {userData?.bio}</p>}
        {userData?.role === 'Trainer' && <p>Rating: {userData?.rating}</p>}
      </div>
    </div>
  )
}
