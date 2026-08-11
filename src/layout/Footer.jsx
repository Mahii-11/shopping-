import { useEffect, useState } from "react";
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaYoutube, 
  FaInstagram, 
  FaWhatsapp, 
  FaTwitter, 
  FaGlobe 
} from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { getFooterPages, getSocialData, getContactData, getWebsiteSettings } from "../services/api"; 
import { Link } from 'react-router';

export default function Footer() {
  const [pages, setPages] = useState([]);
  const [social, setSocial] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);

  const [siteSettings, setSiteSettings] = useState({
    logo: "",
    site_name: "",
    site_description: ""
  });

  const IMAGE_BASE_URL = "https://backend.thecaptainshop.com/"; 

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getWebsiteSettings();
        const settingsData = res?.data || res;

        if (settingsData) {
          // ১. লোগো এর সম্পূর্ণ URL তৈরি করা
          let logoPath = settingsData.logo || "";
          if (logoPath && !logoPath.startsWith("http")) {
            logoPath = `${IMAGE_BASE_URL}${logoPath.replace(/\\/g, "/")}`;
          }

          // ২. site_description সহ স্টেট আপডেট
          setSiteSettings({
            logo: logoPath,
            site_name: settingsData.site_name || "",
            site_description: settingsData.site_description || settingsData.description || ""
          });
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const data = await getFooterPages();
        setPages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching Pages Data", error);
      }
    };

    loadPages();
  }, []);

  useEffect(() => {
    const loadSocial = async () => {
      try {
        const res = await getSocialData();
        const socialList = res?.data || res || [];
        setSocial(Array.isArray(socialList) ? socialList : []);
      } catch (error) {
        console.error("Error fetching Social data", error);
      }
    };
    loadSocial();
  }, []);

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const res = await getContactData();
        if (res?.data) {
          setContactInfo(res.data);
        }
      } catch (error) {
        console.error("Error fetching Contact Data", error);
      }
    };
    loadContactInfo();
  }, []);

  // সোশ্যাল আইকন হেল্পার
  const renderSocialIcon = (item) => {
    const iconClass = (item.icon || "").toLowerCase();
    const linkUrl = (item.link || "").toLowerCase();

    if (iconClass.includes("facebook") || linkUrl.includes("facebook.com")) {
      return <FaFacebookF />;
    }
    if (iconClass.includes("whatsapp") || linkUrl.includes("wa.me") || linkUrl.includes("whatsapp.com")) {
      return <FaWhatsapp />;
    }
    if (iconClass.includes("instagram") || linkUrl.includes("instagram.com")) {
      return <FaInstagram />;
    }
    if (iconClass.includes("youtube") || linkUrl.includes("youtube.com")) {
      return <FaYoutube />;
    }
    if (iconClass.includes("linkedin") || linkUrl.includes("linkedin.com")) {
      return <FaLinkedinIn />;
    }
    if (iconClass.includes("twitter") || linkUrl.includes("twitter.com") || linkUrl.includes("x.com")) {
      return <FaTwitter />;
    }

    return <FaGlobe />;
  };

  return (
    <footer className="w-full">
      {/* Top Section */}
      <div className="bg-[#f1f1f1] px-6 md:px-20 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          
          {/* Brand / Logo Section */}
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-3 shrink-0"> 
              {siteSettings.logo && (
                <img
                  src={siteSettings.logo}
                  alt={siteSettings.site_name || "Logo"}
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <span className="font-extrabold text-[#002B5B] font-serif tracking-tight italic text-lg md:text-xl font-display uppercase">
                {siteSettings.site_name}
              </span>
            </div>

            {siteSettings.site_description && (
              <div className="space-y-6 text-gray-700 font-serif text-sm sm:text-base leading-relaxed text-justify max-w-3xl">
                <p className="first-letter:text-3xl first-letter:font-extrabold first-letter:text-[#C1272D]">
                  {siteSettings.site_description}
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-3 text-gray-600">
              {pages.map((page) => (
                <li key={page.id || page.slug}>
                  <Link 
                    to={`/show-page/${page.slug}`} 
                    className="hover:text-black cursor-pointer transition-colors block"
                  >
                    {page.page_name || page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">CONTACT US</h3>
            <ul className="space-y-4 text-gray-700">
              {contactInfo?.address && (
                <li className="flex items-start gap-3">
                  <div className="mt-1">
                    <HiOutlineLocationMarker className="text-xl shrink-0 text-gray-800" />
                  </div>
                  <span className="text-sm leading-relaxed">{contactInfo.address}</span>
                </li>
              )}

              {contactInfo?.phone && (
                <li className="flex items-center gap-3">
                  <div>
                    <HiOutlinePhone className="text-xl shrink-0 text-gray-800" />
                  </div>
                  <a 
                    href={`tel:${contactInfo.phone}`} 
                    className="text-sm hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}

              {contactInfo?.email && (
                <li className="flex items-center gap-3">
                  <div>
                    <HiOutlineMail className="text-xl shrink-0 text-gray-800" />
                  </div>
                  <a 
                    href={`mailto:${contactInfo.email}`} 
                    className="text-sm hover:underline break-all"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">FOLLOW US</h3>
            <div className="flex flex-wrap gap-4">
              {social.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {renderSocialIcon(item)}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar / Copyright */}
      <div className="bg-black text-white text-center py-5 text-sm px-4">
        {contactInfo?.copyright || "© 2026. All rights reserved"}
      </div>
    </footer>
  );
}