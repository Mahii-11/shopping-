import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getPageDetails } from "../services/api";

export default function ShowPage() {
  const { slug } = useParams(); // URL থেকে ডায়নামিক slug পাবে (যেমন: about-us, privacy-policy)
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        // URL slug না থাকলে ডিফল্ট 'about-us' ধরে নেবে
        const currentSlug = slug || "about-us";
        
        // API Call: show-page/${currentSlug}
        const res = await getPageDetails(currentSlug);
        
        if (res?.data) {
          setPageData(res.data);
        } else if (res) {
          setPageData(res);
        }
      } catch (error) {
        console.error("Error loading page content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Loading Content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-black selection:text-white">
      
      {/* 🔹 HERO BANNER SECTION */}
      <section className="bg-[#0B132B] text-white py-16 md:py-24 px-6 md:px-16 relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-6 uppercase tracking-wider font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-300">Pages</span>
            <span>/</span>
            <span className="text-white font-semibold">
              {pageData?.page_name || "Page Details"}
            </span>
          </nav>

          {/* Title and Action Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/15 text-[11px] font-semibold tracking-widest uppercase rounded-full text-gray-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                THE CAPTAIN OFFICIAL
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif text-white">
                {pageData?.page_name || "About Us"}
              </h1>
            </div>

            {/* Share / Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-medium tracking-wider text-white transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            >
              {copied ? (
                <span className="text-emerald-400 font-bold">Link Copied!</span>
              ) : (
                <span>Share Page</span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 🔹 MAIN HTML CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="bg-white p-8 md:p-16 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
          
          {pageData?.description ? (
            <article 
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:pb-3 prose-h1:border-b prose-h1:border-gray-200 prose-h1:text-[#002B5B]
                prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-gray-800
                prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-700
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-base prose-p:md:text-lg prose-p:mb-5
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-[#C1272D] prose-a:font-semibold prose-a:underline hover:prose-a:text-black transition-colors
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-li:text-gray-600 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: pageData.description }}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No content available for this page.</p>
            </div>
          )}

          {/* Footer Note Inside Article */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
            <p>© {new Date().getFullYear()} THE CAPTAIN. All rights reserved.</p>
            <p className="italic">
              Updated: {pageData?.updated_at ? new Date(pageData.updated_at).toLocaleDateString() : 'Recently'}
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}