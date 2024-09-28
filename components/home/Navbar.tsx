"use client";

import { coverImage, Logo, search, shoppingCart } from "@/app/assets";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiHome } from "react-icons/ci";
import {
  FaCog,
  FaHeadset,
  FaInfoCircle,
  FaShoppingCart,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
// import SearchComponent from "./SearchComponent";
import { useCartStore } from "@/store/cart-store/cartStore";
import CartModal from "../products/CartModel";
import SearchComponent from "./SearchComponent";
import { useAuthStore } from "@/store/auth-stores/authStore";
import { useRouter } from "next/navigation";


interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}



const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const { toggleCart, items } = useCartStore();
  const { user, logout } = useAuthStore();
  const router = useRouter();


  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

 const getUserDisplayName = () => {
    if (!user || !user.firstName || !user.lastName) return 'User';
    const { firstName, lastName } = user;
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return user.email?.split('@')[0];
  };

  const getUserEmail = () => {
    return localStorage.getItem("user-email")|| "Not logged in"
  };

  // handle logout
  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
    logout();
    setDropdownOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false); // Close the mobile menu whenever the route changes
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation items
  const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: <CiHome size={18} /> },
    {
      label: "Stores",
      href: "/store",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          />
        </svg>
      ),
    },
  ];

  // Check if a route is active
  const isActive = (href: string) => {
    if (href === "/") {
      // For the home route, check if the pathname is exactly '/' or starts with '/products'
      return pathname === "/" || pathname.startsWith("/product");
    }
    return pathname.startsWith(href);
  };


  return (
    <>
      <nav className="w-full flex justify-between items-center py-4 px-6 border-b bg-white text-sm">
        <div className="flex items-center space-y-3 md:space-x-10 lg:space-x-24">
          <Link
            href="/"
            passHref
            className="group hover:scale-105 duration-500 transition"
          >
            <span className="flex items-center space-x-2 cursor-pointer">
              <Image src={Logo} alt="Mark8 Logo" className="h-8 w-auto" />
              <div className="flex flex-col">
                <span className="text-lg font-black text-black">Mark8</span>
                <span className="text-sm text-gray-500 group-hover:text-[#c1cf16] duration-500 transition">
                  By Awesomity Lab
                </span>
              </div>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                passHref
                className="group"
              >
                <span className="flex items-center space-x-2 text-gray-700 hover:text-black hover:scale-105 duration-500 transition">
                  <span
                    className={`${isActive(item.href) && "text-secondary"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm group-hover:text-[#c1cf16] duration-500 transition">
                    {item.label}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <button
          className="lg:hidden text-gray-700"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
        </button>

        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-md z-50 lg:hidden transition duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-4 py-4 items-center">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <span className="text-gray-700 flex items-center space-x-2 -translate-x-2.5 hover:text-black hover:scale-105">
                  <span
                    className={`${isActive(item.href) && "text-secondary"}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
            <div className="flex flex-col space-y-4 mt-4">
              <button
                className="text-gray-700 flex items-center space-x-2 hover:text-black hover:scale-105"
                onClick={toggleSearch}
              >
                <Image src={search} alt="search" />
                <span className="text-sm block lg:hidden">Search</span>
              </button>
              <div className="relative">
                <button
                  className="text-gray-700 hover:text-black flex items-center space-x-2 whitespace-nowrap group"
                  onClick={toggleCart}
                >
                  <span>
                    <Image
                      src={shoppingCart}
                      alt="shopping-cart"
                      className="group-hover:scale-105"
                    />
                  </span>
                  <span className="text-sm flex items-center space-x-2 font-thin group-hover:text-[#c1cf16] duration-500 transition">
                    <span> My Cart</span>
                    {items.length > 0 && (
                      <span className="bg-red-600 text-white text-xs rounded-full h-1 w-1 flex items-center justify-center" />
                    )}
                  </span>
                </button>
              </div>
              <Link
                href="/saved"
                className="text-gray-700 hover:text-black flex items-center space-x-2 whitespace-nowrap group"
              >
                <span className={`${isActive("/saved") && "text-[#c1cf16]"}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 group-hover:scale-105"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </span>
                <span className="group-hover:text-[#c1cf16] duration-500 transition">
                  Saved
                </span>
              </Link>
            </div>
            <Link href="/open-store" passHref>
              <span className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-200">
                <FaStore size={16} />
                <span>Open A Store</span>
              </span>
            </Link>
            {isMobileMenuOpen && (
              <div className="relative group">
                <div className="dropdown">
                  <button
                    tabIndex={0}
                    role="button"
                    onClick={handleDropdownToggle}
                    className="relative flex items-center group-hover:border-[#c1cf16] hover:scale-105 duration-500 transition text-gray-700 hover:text-black border border-gray-300 rounded-lg px-4 py-2 space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>

                    <span className="absolute left-9 border-l border-gray-300 h-10 mx-2"></span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-white text-sm shadow-md rounded-lg z-[1] w-80 p-10 space-y-4 absolute left-1/2 transform -translate-x-1/2"
                    >
                      {/* Profile Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl">
                          {/* Profile Image */}
                          <Image
                            src={coverImage}
                            alt="Profile"
                            className="w-full h-full rounded-xl object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                          {getUserDisplayName()}
                          </h3>
                          <p className="text-sm text-gray-500">
                          {getUserEmail()}
                          </p>
                        </div>
                      </div>

                      <hr className="border-gray-200" />

                      {/* Menu Items */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <FaUser className="text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            My Account
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaShoppingCart className="text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            My Orders
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaHeadset className="text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            Help
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaInfoCircle className="text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            About
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <FaCog className="text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            Settings
                          </span>
                        </div>
                      </div>

                      <hr className="border-gray-200" />

                      {/* Logout */}
                      <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="text-gray-500" />
                        <span className="text-gray-700 font-medium">
                          Logout
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <button
            className="text-gray-700 hover:text-black hover:scale-105"
            onClick={toggleSearch}
          >
            <Image src={search} alt="search" />
          </button>

          <div className="relative">
            <button
              className="text-gray-700 hover:text-black flex items-center space-x-2 whitespace-nowrap group"
              onClick={toggleCart}
            >
              <span>
                <Image
                  src={shoppingCart}
                  alt="shopping-cart"
                  className="group-hover:scale-105"
                />
              </span>
              <span className="text-sm flex items-center space-x-2 font-thin group-hover:text-[#c1cf16] duration-500 transition">
                <span> My Cart</span>
                {items.length > 0 && (
                  <span className="bg-red-600 text-white text-xs rounded-full h-1 w-1 flex items-center justify-center" />
                )}
              </span>
            </button>
          </div>

          <Link
            href="/saved"
            className="text-gray-700 hover:text-black flex items-center space-x-2 whitespace-nowrap group"
          >
            <span className={`${isActive("/saved") && "text-[#c1cf16]"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={`${isActive("/saved") ? "#c1cf16" : "none"}`}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 group-hover:scale-105"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <span className="group-hover:text-[#c1cf16] duration-500 transition">
              Saved
            </span>
          </Link>

          <Link href="/open-store" passHref className="group">
            <span className="bg-white duration-500 transition hover:scale-105 border border-gray-300 rounded-lg px-4 py-2.5 flex items-center space-x-2 hover:bg-transparent group-hover:border-[#c1cf16]">
              <span>Open A Store</span>
              <span className="text-[#c1cf16]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
              </span>
            </span>
          </Link>

          {/* User account */}
          <div className="relative group">
            <div className="dropdown">
              <button
                tabIndex={0}
                role="button"
                onClick={handleDropdownToggle}
                className="relative flex items-center group-hover:border-[#c1cf16] hover:scale-105 duration-500 transition text-gray-700 hover:text-black border border-gray-300 rounded-lg px-4 py-2 space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span className="absolute left-9 border-l border-gray-300 h-10 mx-2"></span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg-white shadow-md rounded-lg z-[1] w-80 p-10 mr-5 space-y-4 absolute right-5"
                >
                  {/* Profile Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-xl">
                      {/* profile image */}
                      <Image
                        src={coverImage}
                        alt="Profile"
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                      {getUserDisplayName()}
                      </h3>
                      <p className="text-sm text-gray-500">
                      {getUserEmail()}
                      </p>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Menu Items */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaUser className="text-gray-500" />
                      <span className="text-gray-700 font-medium">
                        My Account
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaShoppingCart className="text-gray-500" />
                      <span className="text-gray-700 font-medium">
                        My Orders
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaHeadset className="text-gray-500" />
                      <span className="text-gray-700 font-medium">Help</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaInfoCircle className="text-gray-500" />
                      <span className="text-gray-700 font-medium">About</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaCog className="text-gray-500" />
                      <span className="text-gray-700 font-medium">
                        Settings
                      </span>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Logout */}
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="text-gray-500" />
                    <span className="text-gray-700 font-medium">Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50"
          >
            <div
              ref={searchRef}
              className="bg-white rounded-xl shadow-lg w-full max-w-2xl"
            >
              <SearchComponent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <CartModal />
    </>
  );
};

export default Navbar;
