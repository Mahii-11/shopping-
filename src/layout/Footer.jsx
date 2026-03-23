import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl tracking-widest mb-6">SAVIOR</h2>
            <p className="text-background/60 font-sans text-sm max-w-md leading-relaxed mb-6">
              Elevating everyday style with premium fabrics and modern cuts.
            </p>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center">
                f
              </div>
              <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center">
                i
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-sans font-bold text-sm tracking-wider uppercase mb-6">
              Shop
            </h3>
            <ul className="space-y-4 text-sm text-background/60">
              <li><Link to="/category/c-shirt">Shirts</Link></li>
              <li><Link to="/category/c-punjabi">Punjabi</Link></li>
              <li><Link to="/category/c-pants">Pants</Link></li>
              <li><Link to="/category/c-sale">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-bold text-sm tracking-wider uppercase mb-6">
              Newsletter
            </h3>
            <form className="flex border-b border-background/30 pb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none text-sm w-full text-background"
              />
              <button type="submit" className="text-xs uppercase ml-2">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-background/10 pt-8 flex justify-between text-xs text-background/40">
          <p>© {new Date().getFullYear()} SAVIOR Lifestyle</p>
        </div>

      </div>
    </footer>
  );
}