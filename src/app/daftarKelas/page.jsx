'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [daftarKelas, setDaftarKelas] = useState([])

  const router = useRouter()


  useEffect(() => {
    const fetchClass = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sesi-kelas`;
        const response = await fetch(apiUrl);
        
        const data = await response.json();
        setDaftarKelas(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClass()
  }, [])

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
