const UllaJohnsonSection = () => {
  const collections = [
    {
      id: 1,
      title: "Ulla Johnson",
      desc: "Fluid silhouettes and artisanal details for effortless elegance.",
      link: "Shop the collection",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 2,
      title: "Spring Edit",
      desc: "Modern tailoring and soft textures curated for the new season.",
      link: "Discover more",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  return (
    <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto">

        {/* Heading */}
        <div className="mb-10 md:mb-14 text-center">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-gray-500 mb-3">
            New Arrivals
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-black tracking-tight">
            The Seasonal Edit
          </h2>
        </div>

        {/* Two Image Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {collections.map((item) => (
            <article key={item.id} className="group">

              {/* Image */}
              <div className="overflow-hidden bg-neutral-100 rounded-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Text */}
              <div className="pt-5 md:pt-6 text-left">
                <h3 className="text-xl md:text-2xl font-serif text-black mb-3">
                  {item.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 max-w-md">
                  {item.desc}
                </p>

                <a
                  href="#"
                  className="inline-block text-[13px] md:text-sm font-medium text-black border-b border-black pb-1 hover:opacity-60 transition"
                >
                  {item.link}
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UllaJohnsonSection;