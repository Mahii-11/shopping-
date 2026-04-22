import React from 'react';

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000', title: "First Image" },
  { id: 2, src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000', title: "Second" },
  { id: 3, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500', title: "Third" },
  { id: 4, src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=500', title: "Fourth" },
];

const EditorialBanner = () => {
  return (
    <>
     <style>{`
@keyframes mobileInfiniteSlide {
  0%,20% { transform: translateX(0%); }
  25%,45% { transform: translateX(-100%); }
  50%,70% { transform: translateX(-200%); }
  75%,95% { transform: translateX(-300%); }
  100% { transform: translateX(0%); }
}

.mobile-slider-track{
  display:flex;
  height:100%;
  animation: mobileInfiniteSlide 12s infinite ease-in-out;
}
`}</style>

      <section className="w-full bg-white py-6 md:py-10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          
          {/* PORTER LOGO - Always at the top */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-serif tracking-tighter text-black">PORTER</h1>
          </div>

          {/* Desktop Layout (Grid) */}
          <div className="hidden md:grid grid-cols-12 gap-1 h-[600px] overflow-hidden">
            <div className="col-span-6 h-full">
              <img src={images[0].src} alt="Main" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 h-full">
              <img src={images[1].src} alt="Sub 1" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 h-full">
              <img src={images[2].src} alt="Sub 2" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 h-full">
              <img src={images[3].src} alt="Sub 3" className="w-full h-full object-cover" />
            </div>
          </div>


          <div className="md:hidden relative w-full overflow-hidden aspect-[3/4] rounded-sm">
            <div className="mobile-slider-track h-full">
              {images.map((img) => (
                <div key={img.id} className="min-w-full h-full">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text Content - Guaranteed to be below images */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-serif text-black leading-tight">
                Camila Morrone's 'yes' era
              </h2>
            </div>
            <div className="w-full md:w-1/3">
              <p className="text-gray-800 text-base md:text-xl font-light leading-relaxed mb-4">
                The actor talks turning the dream into reality, playing strong female characters and keeping life as easy as possible.
              </p>
              <a href="#" className="inline-block text-sm font-semibold border-b border-black pb-1 hover:opacity-60 transition-opacity">
                Read the interview & shop the shoot
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default EditorialBanner;