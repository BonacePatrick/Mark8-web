import { Logo } from "@/app/assets";
import Image from "next/image";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        {/* Left Section: Logo and Name */}
        <div className="flex items-center space-x-2">
          {/* Logo Icon */}
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">Mark8</span>
        </div>

        {/* Center Section: Copyright */}
        <div className="text-sm text-gray-500 order-3 sm:order-2">
          <span className="">
            <span className="text-black font-black">
              {"© " + new Date().getFullYear() + ". Mark8"}
            </span>{" "}
            By Awesomity Ltd
          </span>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex space-x-4 order-2 sm:order-3">
          <Link
            href="#"
            className="text-black hover:text-gray-600 transition duration-500 hover:scale-105"
          >
            <BsTwitterX size={14} />
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-600 transition duration-500 hover:scale-105"
          >
            <FaInstagram size={14} />
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-600 transition duration-500 hover:scale-105"
          >
            <FaYoutube size={14} />
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-600 transition duration-500 hover:scale-105"
          >
            <FaLinkedin size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
