import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="w-full">
      
      {/* Top Section */}
      <div className="bg-[#f1f1f1] px-6 md:px-20 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          
          {/* Logo */}
          <div>
            <h1 className="text-3xl font-bold tracking-widest">
              SAVIOR
            </h1>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-black cursor-pointer">About Us</li>
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
              <li className="hover:text-black cursor-pointer">Terms And Conditions</li>
              <li className="hover:text-black cursor-pointer">Return And Cancellation Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">CONTACT US</h3>
            <ul className="space-y-4 text-gray-700">
              
              <li className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <HiOutlineLocationMarker className="text-xl" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <HiOutlinePhone className="text-xl" />
                </div>
                <span>01710088496</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <HiOutlineMail className="text-xl" />
                </div>
                <span>saviorlifestyle@gmail.com</span>
              </li>

            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">FOLLOW US</h3>
            <div className="flex gap-4">
              
              <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full cursor-pointer">
                <FaFacebookF />
              </div>

              <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full cursor-pointer">
                <FaLinkedinIn />
              </div>

              <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full cursor-pointer">
                <FaYoutube />
              </div>

              <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full cursor-pointer">
                <FaInstagram />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-white text-center py-5 text-sm">
        © Savior Lifestyle 2026. All rights reserved
      </div>

    </footer>
  );
}