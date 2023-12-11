'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [daftarKelas, setDaftarKelas] = useState([])

  const router = useRouter()


  useEffect(() => {
    const fetchClass = async () => {
      try {
        // ini tembak api
        const hardcodedData = [
          {
            id: '04eef712-19d1-484a-8076-668626d820c8',
            judul: 'Kelas Aerobik Mantap',
            deskripsi: 'Membuat jantung dan badan sehat',
            jadwalWaktu: '21-12-2023 19:00',
            maxParticipant: 20,
            currentParticipant: 0,
          },
          {
            id: '098b8650-e088-4458-b60c-5fec0e7e67e5',
            judul: 'Kelas Aerobik Mantap',
            deskripsi: 'Membuat jantung dan badan sehat',
            jadwalWaktu: '21-12-2023 21:00',
            maxParticipant: 20,
            currentParticipant: 0,
          },
        ]

        setDaftarKelas(hardcodedData)
        console.log(daftarKelas)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchClass()
  }, [daftarKelas])

  const handleCardClick = (kelas) => {
    // redirect ke detail kelas
    router.push(`/detailKelas/${kelas.id}`)
  }

  return (
    <>
      <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Daftar Kelas</h1>
      
        {daftarKelas.map((kelas) => (
          <div
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 mb-4"
            key={kelas.id}
            onClick={() => handleCardClick(kelas)}
          >
            <h2 className="text-gray-500 font-semibold mb-2">{kelas.judul}</h2>
            <p className="text-gray-600 mb-2">{kelas.deskripsi}</p>
            <p className="text-gray-500">Jadwal: {kelas.jadwalWaktu}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-500">
                Participants: {kelas.currentParticipant}/{kelas.maxParticipant}
              </p>
            </div>
          </div>
        ))}
      
    </div>
    </>
  )
}
