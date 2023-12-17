'use client'
import { useEffect, useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import { useAuthContext } from '@/contexts/authContext'
import { useRouter } from 'next/navigation'
import { useToken } from '@/hooks/useToken'

export default function UpdateProfilePage() {
  const { pengguna } = useAuthContext()
  const { getPenggunaToken } = useToken()
  const [newDisplayName, setNewDisplayName] = useState()
  const [newBio, setNewBio] = useState()
  const [newNoTelp, setNewNoTelp] = useState('')
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
          setNewDisplayName(data.data.displayName)
          setNewNoTelp(data.data.noTelp)
          setNewBio(data.data.bio)
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

  const handleProfileUpdate = async (e) => {
    e.preventDefault()

    try {
      if (pengguna.role === 'Trainer') {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/trainer/${pengguna.email}/updateBio`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newBio }),
          }
        )
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pengguna/${pengguna.email}/updateProfile`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newDisplayName, newNoTelp }),
          }
        )
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pengguna/${pengguna.email}/updateProfile`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newDisplayName, newNoTelp }),
          }
        )
      }
      router.push('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleRedirectToProfile = () => {
    router.push('/profile')
  }

  return (
    <div className="flex justify-center flex-col my-5 w-1/2 animate__animated animate__fadeInUp">
      <h2 className="text-3xl font-bold mb-5 mt-24">Update Profile</h2>
      <div className="shadow w-full rounded bg-white p-8">
        <form className="space-y-4 md:space-y-6" onSubmit={handleProfileUpdate}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="displayName" className="text-gray-800">
              Display Name
            </label>
            <Input
              className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="noTelp" className="text-gray-800">
              No Telp
            </label>
            <Input
              className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
          </div>
          {pengguna?.role === 'Trainer' && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="text-gray-800">
                Bio
              </label>
              <Input
                className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
            </div>
          )}

          <Button color="primary" type="submit">
            Update
          </Button>
        </form>
        <Button
          onClick={handleRedirectToProfile}
          color="primary"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
