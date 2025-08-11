export default function AdBannerGrid() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <img
              src={"/placeholder.svg?height=220&width=360&query=promotion+banner+" + (i + 1)}
              alt={"Ad banner " + (i + 1)}
              className="h-[220px] w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
