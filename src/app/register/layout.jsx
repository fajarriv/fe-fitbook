export default function RegisterLayout({ children }) {
  return (
    <>
      <main>
        <div className="flex items-center my-32 animate__animated animate__fadeInUp">
          <div className="w-full">
            <div className="flex justify-center">{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}