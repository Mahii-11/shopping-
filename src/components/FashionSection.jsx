import React from 'react';

const FashionSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Savette */}
        <div className="flex flex-col">
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-4">
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500" 
              alt="Savette Trapeze bag" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-serif mb-2">Early access: Savette</h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            For a limited time only, discover the chic new 'Trapeze' bag before anyone else
          </p>
          <a href="#" className="inline-block border-b border-black w-fit text-sm font-medium hover:text-gray-600">
            Shop the collection
          </a>
        </div>

        {/* Right Column: Garden Party */}
        <div className="flex flex-col">
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-4">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
              alt="Floral gown" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-serif mb-2">The garden party</h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Nail alfresco elegance with these modern takes on the floral gown and more
          </p>
          <a href="#" className="inline-block border-b border-black w-fit text-sm font-medium hover:text-gray-600">
            Shop the edit
          </a>
        </div>

      </div>
    </section>
  );
};

export default FashionSection;