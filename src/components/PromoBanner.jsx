export default function PromoBanner() {
  return (
    <section className="w-full bg-[#F3F4F6] lg:bg-white  py-4 md:py-16">

      <div className="container-custom">

        <div className="lg:hidden overflow-hidden rounded-xl lg:rounded-none">

          <img
            src="/images/shirt-cover-2.jpg"
            alt="Sale Banner"
            className="
            w-full
            h-[120px]
            sm:h-[150px]
            md:h-[260px]
            lg:h-[320px]
            object-cover
            "
            loading="lazy"
          />

        </div>
          <div className="hidden lg:block  overflow-hidden rounded-xl lg:rounded-none">
          <img
            src="/images/covershirt.jpg"
            alt="Sale Banner"
            className="
            w-full
            h-[120px]
            sm:h-[150px]
            md:h-[260px]
            lg:h-[320px]
            object-cover
            "
            loading="lazy"
          />

        </div>

      </div>

    </section>
  )
}
