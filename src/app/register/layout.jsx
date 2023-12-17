export default function RegisterLayout({ children }) {
  return (
    <>
      <main className="bg-cream">
        <div className="flex items-center py-32 animate__animated animate__fadeInUp">
          <div className="w-full">
            <div className="flex justify-center">{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}