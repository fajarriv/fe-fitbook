'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

const DetailKelas = ({ id }) => {
  const router = useRouter()
  const params = useParams()
  const [kelasDetail, setKelasDetail] = useState()

  useEffect(() => {
    console.log(id)
    const fetchKelasDetail = async () => {
      try {
        const responseData = {
          code: 200,
          data: {
            id: '04eef712-19d1-484a-8076-668626d820c8',
            judul: 'Kelas Aerobik Mantap',
            deskripsi: 'Membuat jantung dan badan sehat',
            trainer: {
              id: 'ae3e25ee-ec54-4bbf-b2a5-e276563d66bd',
              role: 'Trainer',
              name: 'jarip',
              email: 'useraja@gmial.com',
              displayName: 'jaripcoy',
              noTelp: '021',
              bio: 'halo ini bio',
              rating: null,
            },
            jadwalWaktu: '2023-12-21T19:00:00',
            lokasi: 'JIM TERDEKAT CUY',
            maxParticipant: 20,
            currentParticipant: 0,
            status: 'Ongoing',
          },
          status: 'OK',
          message: 'success',
        }

        setKelasDetail(responseData.data)
        console.log(kelasDetail)
      } catch (error) {
        console.error('Error fetching class detail:', error)
      }
    }

    fetchKelasDetail()
  }, [])

  return (
    <>
      <h1>{kelasDetail?.judul}</h1>
      <p>{kelasDetail?.deskripsi}</p>
      <p>Trainer: {kelasDetail?.trainer.displayName}</p>
      <p>Id Kelas: {id}</p>
    </>
  )
}

export default DetailKelas
