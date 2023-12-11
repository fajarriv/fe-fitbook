'use client'
import DetailKelas from "@/components/DetailKelas";
import { useParams } from "next/navigation";

export default function Page() {
  const id = useParams().id
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Detail Kelas</h1>
      <div>
        <DetailKelas id={id}/> 
      </div>
    </div>
  );
}